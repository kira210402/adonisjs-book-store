import User from '#models/user'
import { registerValidator } from '#validators/auth'
import { ModelAttributes } from '@adonisjs/lucid/types/model'
import { BaseService } from './base_service.js'

class UserService extends BaseService<typeof User> {
  constructor() {
    super(User)
  }

  async store(data: Partial<ModelAttributes<InstanceType<typeof User>>>) {
    const payload = await registerValidator.validate(data)
    return super.store(payload)
  }

  // override update method to check validation of input data with updateUserValidator
  async update(id: number, data: Partial<ModelAttributes<InstanceType<typeof User>>>) {
    const payload = await registerValidator.validate(data)
    return super.update(id, payload)
  }
}

export default new UserService()
