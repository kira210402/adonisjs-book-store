import User from '#models/user'
import { registerValidator } from '#validators/auth'
import { ModelAttributes } from '@adonisjs/lucid/types/model'
import { BaseService } from './base_service.js'
import { updateUserValidator } from '#validators/user'

class UserService extends BaseService<typeof User> {
  constructor() {
    super(User)
  }

  // override show method to return user data
  async show(id: number) {
    return super.show(id)
  }

  async store(data: Partial<ModelAttributes<InstanceType<typeof User>>>) {
    const payload = await registerValidator.validate(data)
    return super.store(payload)
  }

  // override update method to check validation of input data with updateUserValidator
  async update(id: number, data: Partial<ModelAttributes<InstanceType<typeof User>>>) {
    const payload = await updateUserValidator.validate(data)
    return super.update(id, payload)
  }

  async destroy(id: number): Promise<null> {
    return super.destroy(id)
  }
}

export default new UserService()
