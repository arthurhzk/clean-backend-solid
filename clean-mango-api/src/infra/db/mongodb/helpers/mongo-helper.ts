/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,
  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
    this.uri = uri
  },

  async disconnect(): Promise<void> {
    await this.client.close()
    this.client = null
  },
  async getCollection(name: string): Promise<Collection> {
    await this.connect(this.uri)

    return this.client.db().collection(name)
  },
  map(collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  },
}
