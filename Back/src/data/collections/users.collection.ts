import { UserModel } from '../models';
import { NotFound } from '../../utils/errors';

export default class UserCollection {
  static async create(createBody: {
    email: string;
    hashedPassword: string;
    salt: string;
  }) {
    return UserModel.create(createBody);
  }

  static get(query: any) {
    return UserModel.findOne({ ...query });
  }

  static getAll(filters: any) {
    return UserModel.find({
      where: filters,
      relations: [
        'createdTasks',
        'assignedTasksPrimary',
        'assignedTasksSecondary',
        'createdProjects',
      ],
    });
  }

  static async update(filter: any, updateBody: any) {
    const foundUser = await UserModel.findOneAndUpdate(filter, updateBody, {
      new: true,
    });

    if (!foundUser) {
      throw new NotFound(`User with primary key ${updateBody.id} not found`);
    }
    await foundUser.save();
    return foundUser;
  }

  static async destroy(id: string) {
    const foundUser = await UserModel.findOne({ id });

    if (!foundUser) throw new NotFound(`User with primary key ${id} not found`);

    await UserModel.deleteOne({ id });
    return foundUser;
  }
}
