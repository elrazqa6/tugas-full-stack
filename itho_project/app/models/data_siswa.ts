import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class DataSiswa extends BaseModel {
  @column({ isPrimary: true })
  declare id: number | undefined

  @column()
  declare nama: string | undefined

  @column()
  declare kelas: string | undefined

  @column()
  declare umur: number | undefined

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | undefined

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | undefined
}