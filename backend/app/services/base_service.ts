import { LucidModel, ModelAttributes } from '@adonisjs/lucid/types/model'
import { Data } from '../constants/constants.js'

export class BaseService<T extends LucidModel> {
  constructor(private model: T) {}

  async pagination(page: number, perPage: number, query?: any): Promise<Data<InstanceType<T>>> {
    let result

    if (query) {
      result = await this.model.query().where(query).paginate(page, perPage)
    } else {
      result = await this.model.query().paginate(page, perPage)
    }

    const { total } = result.getMeta()

    console.log(total)
    console.log('total/perpage', total / perPage)
    console.log('page', page)

    // if (total / perPage < page) {
    //   throw new Error('Page is not available')
    // }

    return {
      data: result.all() as InstanceType<T>[],
      pagination: {
        total,
        perPage,
        page,
      },
    }
  }

  async store(data: Partial<ModelAttributes<InstanceType<T>>>) {
    return this.model.create(data)
  }

  async show(id: number) {
    const model = (await this.model.findOrFail(id)) as InstanceType<T> | null
    if (!model) {
      throw new Error('Model not found')
    }
    return model
  }

  async update(id: number, data: Partial<ModelAttributes<InstanceType<T>>>) {
    const model = (await this.model.findOrFail(id)) as InstanceType<T> | null
    if (!model) {
      throw new Error('Model not found')
    }

    model.merge(data)
    await model.save()
    return model
  }

  async destroy(id: number) {
    const model = (await this.model.findOrFail(id)) as InstanceType<T> | null
    if (!model) {
      throw new Error('Model not found')
    }
    await model.delete()
    return null
  }
}
