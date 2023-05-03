const { ObjectId } = require("mongodb");
class Service {
  constructor(client) {
    this.Students = client.db().collection("students");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractData(payload) {
    const student = {
      mssv: payload.mssv,
      name: payload.name,
      gender: payload.gender,
      bithday: payload.bithday,
      bithplace: payload.bithplace,
      email: payload.email,
      address: payload.address,
      phone: payload.phone,
      maKhoa: payload.maKhoa,
      tenKhoa: payload.tenKhoa,
    }
    // Remove undefined fields
    Object.keys(student).forEach((key) => student[key] === undefined && delete student[key]);
    return student;
  }

  async create(payload) {
    const student = this.extractData(payload);
    const result = await this.Students.findOneAndUpdate(student, 
      { $set: { mssv: student.mssv != null } },
      { returnDocument: "after", upsert: true });
    return result.value;
  }

  async find(filter) {
    const cursor = await this.Students.find(filter);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Students.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractData(payload);
    const result = await this.Students.findOneAndUpdate(filter,
      { $set: update }, { returnDocument: "after" });
    return result.value;
  }

  async delete(id) {
    const result = await this.Students.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
  
  async deleteAll() {
    const result = await this.Students.deleteMany({});
    return result.deletedCount;
  }

  async findFavorite() {
    return await this.find({ favorite: true });
  }
}
module.exports = Service;
