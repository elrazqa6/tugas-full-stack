import type { HttpContext } from '@adonisjs/core/http'
import DataSiswa from '#models/data_siswa'

export default class SiswasController {
  public async index({ response }: HttpContext) {
    const siswas = await DataSiswa.all()
    return response.ok(siswas)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['nama', 'kelas', 'umur'])
    const siswas = await DataSiswa.create(data)
    return response.created(siswas)
  }

  public async show({ params, response }: HttpContext) {
    const siswas = await DataSiswa.find(params.id)
    if (!siswas) {
      return response.notFound({ message: 'Siswa Tidak Ditemukan' })
    }
    return response.ok(siswas)
  }

  public async update({ params, request, response }: HttpContext) {
    const siswas = await DataSiswa.find(params.id)
    if (!siswas) {
      return response.notFound({ message: 'Siswa Tidak Ditemukan' })
    }

    const data = request.only(['nama', 'kelas', 'umur'])
    siswas.merge(data)
    await siswas.save()
    return response.ok(siswas)
  }

  public async destroy({ params, response }: HttpContext) {
    const siswas = await DataSiswa.find(params.id)
    if (!siswas) {
      return response.notFound({ message: 'Siswa Tidak Ditemukan' })
    }

    await siswas.delete()
    return response.noContent()
  }
}
