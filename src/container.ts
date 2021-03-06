import express from 'express'
import { createContainer, asClass } from 'awilix'
import { TestService } from './services/test.service'
import { scopePerRequest } from 'awilix-express'
import { SubscriptionMockRepository } from './repositories/mock/subscription.repository'
import { SubscriptionService } from './services/subscription.service'
import { MovementPgRepository } from './repositories/pg/movement.repository'
import { BalancePgRepository } from './repositories/pg/balance.repository'
import { MovementService } from './services/movement.service'

export default (app: express.Application) => {
  const container = createContainer({ injectionMode: 'CLASSIC' })

  container.register({
    // repositories
    subscriptionRepository: asClass(SubscriptionMockRepository).scoped(),
    movementRepository: asClass(MovementPgRepository).scoped(),
    balanceRepository: asClass(BalancePgRepository).scoped(),

    // services
    subscriptionService: asClass(SubscriptionService).scoped(),
    movementService: asClass(MovementService).scoped(),
    testService: asClass(TestService).scoped()
  })

  app.use(scopePerRequest(container))
}
