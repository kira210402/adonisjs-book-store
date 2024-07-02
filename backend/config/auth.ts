import env from '#start/env'
import { defineConfig } from '@adonisjs/auth'
import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens'
import { sessionGuard, sessionUserProvider } from '@adonisjs/auth/session'
import type { InferAuthEvents, Authenticators } from '@adonisjs/auth/types'
import { jwtGuard } from '@maximemrf/adonisjs-jwt/jwt_config'
import { JwtGuard } from '../app/auth/guards/jwt.js'

// const authConfig = defineConfig({
//   // default: 'api',
//   // guards: {
//   //   api: tokensGuard({
//   //     provider: tokensUserProvider({
//   //       tokens: 'accessTokens',
//   //       model: () => import('#models/user'),
//   //     }),
//   //   }),
//   // },
//   // define the default authenticator to jwt
//   default: 'jwt',
//   guards: {
//     web: sessionGuard({
//       useRememberMeTokens: false,
//       provider: sessionUserProvider({
//         model: () => import('#models/user'),
//       }),
//     }),
//     // add the jwt guard
//     jwt: jwtGuard({
//       // tokenExpiresIn can be a string or a number, it can be optional
//       tokenExpiresIn: '1h',
//       provider: sessionUserProvider({
//         model: () => import('#models/user'),
//       }),
//     }),
//   },
// })

const jwtConfig = {
  secret: env.get('APP_KEY'),
}
const userProvider = sessionUserProvider({
  model: () => import('#models/user'),
})

const authConfig = defineConfig({
  default: 'jwt',
  guards: {
    jwt: (ctx) => {
      return new JwtGuard(ctx, userProvider, jwtConfig)
    }
  },
})

export default authConfig

/**
 * Inferring types from the configured auth
 * guards.
 */
declare module '@adonisjs/auth/types' {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
