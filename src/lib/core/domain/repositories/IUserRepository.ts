import type { UserEntity } from "@/lib/core/domain/entities/User"

export interface IUserRepository {
  getAllUsers: () => Promise<UserEntity[]>
  getUserByUsername: (username: UserEntity["username"]) => Promise<UserEntity>
  createUser: (user: UserEntity) => Promise<UserEntity>
}
