using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

public class EditUser
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string NewUserName { get; set; }
    public string NewEmail { get; set; }
    public string NewCnpj { get; set; }
    public string NewPassword { get; set; }
    public string UserId { get; set; }
}