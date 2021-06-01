import * as cdk from '@aws-cdk/core'
import * as dynamodb from '@aws-cdk/aws-dynamodb'
import * as nodelambda from '@aws-cdk/aws-lambda-nodejs'
import * as api from '@aws-cdk/aws-apigatewayv2'
import {CorsHttpMethod, HttpMethod} from '@aws-cdk/aws-apigatewayv2'
import {LambdaProxyIntegration} from '@aws-cdk/aws-apigatewayv2-integrations'

export class InfraStack extends cdk.Stack {
  private usersTable: dynamodb.Table
  private articlesTable: dynamodb.Table
  private commentsTable: dynamodb.Table
  private httpApi: api.HttpApi

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    this.createTables()
    this.createApi()

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: this.httpApi.url as string,
    })
  }

  private createTables() {
    const commonTableProps = {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    }

    this.usersTable = new dynamodb.Table(this, 'UsersTable', {
      ...commonTableProps,
      partitionKey: {name: 'username', type: dynamodb.AttributeType.STRING},
    })

    this.usersTable.addGlobalSecondaryIndex({
      indexName: 'email',
      partitionKey: {name: 'email', type: dynamodb.AttributeType.STRING},
    })

    this.articlesTable = new dynamodb.Table(this, 'ArticlesTable', {
      ...commonTableProps,
      partitionKey: {name: 'slug', type: dynamodb.AttributeType.STRING},
    })

    this.articlesTable.addGlobalSecondaryIndex({
      indexName: 'updatedAt',
      partitionKey: {name: 'dummy', type: dynamodb.AttributeType.STRING},
      sortKey: {name: 'updatedAt', type: dynamodb.AttributeType.NUMBER},
    })

    this.commentsTable = new dynamodb.Table(this, 'CommentsTable', {
      ...commonTableProps,
      partitionKey: {name: 'id', type: dynamodb.AttributeType.STRING},
    })

    this.commentsTable.addGlobalSecondaryIndex({
      indexName: 'article',
      partitionKey: {name: 'slug', type: dynamodb.AttributeType.STRING},
    })
  }

  private createApi() {
    this.httpApi = new api.HttpApi(this, 'HttpApi', {
      corsPreflight: {
        allowHeaders: ['Authorization'],
        allowMethods: [CorsHttpMethod.ANY],
        allowOrigins: ['*'],
      },
    })

    this.createUserApi()
    this.createArticleApi()
    this.createCommentsApi()
    this.createUtilsApi()
  }

  private createUserApi() {
    const functionDefaults = {
      entry: './src/User.js',
      environment: {
        USERS_TABLE_NAME: this.usersTable.tableName,
      },
    }

    const addFunction = ({
      key,
      methods,
      path,
    }: {
      key: string
      methods: HttpMethod[]
      path: string
    }) => {
      const handler = new nodelambda.NodejsFunction(this, `${key}User`, {
        ...functionDefaults,
        handler: key,
      })
      this.usersTable.grantReadWriteData(handler)

      this.httpApi.addRoutes({
        path,
        methods,
        integration: new LambdaProxyIntegration({handler}),
      })
    }

    addFunction({key: 'create', methods: [HttpMethod.POST], path: '/api/users'})
    addFunction({key: 'login', methods: [HttpMethod.POST], path: '/api/users/login'})
    addFunction({key: 'get', methods: [HttpMethod.GET], path: '/api/user'})
    addFunction({key: 'update', methods: [HttpMethod.PUT], path: '/api/user'})
    addFunction({
      key: 'getProfile',
      methods: [HttpMethod.GET],
      path: '/api/profiles/{username}',
    })
    addFunction({
      key: 'follow',
      methods: [HttpMethod.POST, HttpMethod.DELETE],
      path: '/api/profiles/{username}/follow',
    })
  }

  private createArticleApi() {
    const functionDefaults = {
      entry: './src/Article.js',
      environment: {
        ARTICLES_TABLE_NAME: this.articlesTable.tableName,
        USERS_TABLE_NAME: this.usersTable.tableName,
      },
    }

    const addFunction = ({
      key,
      methods,
      path,
    }: {
      key: string
      methods: HttpMethod[]
      path: string
    }) => {
      const handler = new nodelambda.NodejsFunction(this, `${key}Article`, {
        ...functionDefaults,
        handler: key,
      })
      this.articlesTable.grantReadWriteData(handler)
      this.usersTable.grantReadData(handler)

      this.httpApi.addRoutes({
        path,
        methods,
        integration: new LambdaProxyIntegration({handler}),
      })
    }

    addFunction({
      key: 'create',
      methods: [HttpMethod.POST],
      path: '/api/articles',
    })

    addFunction({
      key: 'get',
      methods: [HttpMethod.GET],
      path: '/api/articles/{slug}',
    })

    addFunction({
      key: 'update',
      methods: [HttpMethod.PUT],
      path: '/api/articles/{slug}',
    })

    addFunction({
      key: 'delete',
      methods: [HttpMethod.DELETE],
      path: '/api/articles/{slug}',
    })

    addFunction({
      key: 'favorite',
      methods: [HttpMethod.POST, HttpMethod.DELETE],
      path: '/api/articles/{slug}/favorite',
    })

    addFunction({
      key: 'list',
      methods: [HttpMethod.GET],
      path: '/api/articles',
    })

    addFunction({
      key: 'getFeed',
      methods: [HttpMethod.GET],
      path: '/api/articles/feed',
    })

    addFunction({
      key: 'getTags',
      methods: [HttpMethod.GET],
      path: '/api/tags',
    })
  }

  private createCommentsApi() {
    const functionDefaults = {
      entry: './src/Comment.js',
      environment: {
        ARTICLES_TABLE_NAME: this.articlesTable.tableName,
        COMMENTS_TABLE_NAME: this.commentsTable.tableName,
        USERS_TABLE_NAME: this.usersTable.tableName,
      },
    }

    const addFunction = ({
      key,
      methods,
      path,
    }: {
      key: string
      methods: HttpMethod[]
      path: string
    }) => {
      const handler = new nodelambda.NodejsFunction(this, `${key}Comment`, {
        ...functionDefaults,
        handler: key,
      })
      this.articlesTable.grantReadWriteData(handler)
      this.commentsTable.grantReadWriteData(handler)
      this.usersTable.grantReadWriteData(handler)

      this.httpApi.addRoutes({
        path,
        methods,
        integration: new LambdaProxyIntegration({handler}),
      })
    }

    addFunction({
      key: 'create',
      methods: [HttpMethod.POST],
      path: '/api/articles/{slug}/comments',
    })

    addFunction({
      key: 'get',
      methods: [HttpMethod.GET],
      path: '/api/articles/{slug}/comments',
    })

    addFunction({
      key: 'delete',
      methods: [HttpMethod.DELETE],
      path: '/api/articles/{slug}/comments/{id}',
    })
  }

  private createUtilsApi() {
    const functionDefaults = {
      entry: './src/Util.js',
      environment: {
        ARTICLES_TABLE_NAME: this.articlesTable.tableName,
        COMMENTS_TABLE_NAME: this.commentsTable.tableName,
        USERS_TABLE_NAME: this.usersTable.tableName,
      },
    }

    const addFunction = ({
      key,
      methods,
      path,
    }: {
      key: string
      methods: HttpMethod[]
      path: string
    }) => {
      const handler = new nodelambda.NodejsFunction(this, key, {
        ...functionDefaults,
        handler: key,
      })
      this.articlesTable.grantReadWriteData(handler)
      this.commentsTable.grantReadWriteData(handler)
      this.usersTable.grantReadWriteData(handler)

      this.httpApi.addRoutes({
        path,
        methods,
        integration: new LambdaProxyIntegration({handler}),
      })
    }

    addFunction({
      key: 'ping',
      methods: [HttpMethod.GET],
      path: '/api/ping',
    })

    addFunction({
      key: 'purgeData',
      methods: [HttpMethod.DELETE],
      path: '/api/__TESTUTILS__/purge',
    })
  }
}
