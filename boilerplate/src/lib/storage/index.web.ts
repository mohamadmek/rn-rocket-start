import AsyncStorage from '@react-native-async-storage/async-storage'; // Web fallback storage
import { TLocalStorageSchema } from './schema';
import { IS_DEV } from '@/src/env';

/**
 * Web-specific storage class using AsyncStorage.
 */
class WebStorage {
  private sep = ':';

  async set(key: string, value: any): Promise<void> {
    const stringValue = JSON.stringify({ data: value });
    await AsyncStorage.setItem(key, stringValue);
  }

  async get<T>(key: string): Promise<T | undefined> {
    const res = await AsyncStorage.getItem(key);
    return res ? JSON.parse(res).data : undefined;
  }

  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }

  async removeMany(keys: string[]): Promise<void> {
    await AsyncStorage.multiRemove(keys);
  }
}

/**
 * Generic storage class. DO NOT use this directly. Instead, use the exported
 * storage instances below.
 */
export class Storage<Scopes extends unknown[], Schema> {
  private sep = ':';
  private store: WebStorage;

  constructor({ id }: { id: string }) {
    this.store = new WebStorage();
  }

  async set<Key extends keyof Schema>(
    scopes: [...Scopes, Key],
    data: Schema[Key],
  ): Promise<void> {
    await this.store.set(scopes.join(this.sep), data);
  }

  async get<Key extends keyof Schema>(
    scopes: [...Scopes, Key],
  ): Promise<Schema[Key] | undefined> {
    return this.store.get<Schema[Key]>(scopes.join(this.sep));
  }

  async remove<Key extends keyof Schema>(
    scopes: [...Scopes, Key],
  ): Promise<void> {
    await this.store.remove(scopes.join(this.sep));
  }

  async removeMany<Key extends keyof Schema>(
    scopes: [...Scopes],
    keys: Key[],
  ): Promise<void> {
    await this.store.removeMany(
      keys.map((key) => [...scopes, key].join(this.sep)),
    );
  }
}

/**
 * Device data that's specific to the device and does not vary based on account
 *
 *   `device.set([key], true)`
 */
export const deviceStorage = new Storage<[], TLocalStorageSchema>({
  id: 'rn_rocket_start',
});

if (IS_DEV && typeof window !== 'undefined') {
  // @ts-ignore
  window.app_storage = {
    deviceStorage,
  };
}
