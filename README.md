
express: Framework chính cho ứng dụng web.
mongoose: Thư viện để làm việc với MongoDB.
dotenv: Quản lý biến môi trường.
cors: Xử lý vấn đề Cross-Origin Resource Sharing.
nodemon: Giúp tự động tái khởi động server khi có thay đổi trong mã nguồn.

Cấu trúc BE:
social-network-client/
  config/
    db.js              // Cấu hình kết nối MongoDB
  controllers/         
    authController.js   // Xử lý logic đăng nhập, đăng ký
    postController.js   // Xử lý logic liên quan đến bài đăng
  models/
    User.js             // Mô hình người dùng
    Post.js             // Mô hình bài đăng
  routes/
    authRoutes.js       // Định nghĩa các route cho auth
    postRoutes.js       // Định nghĩa các route cho bài đăng
  .env                  // Biến môi trường (cấu hình MongoDB, JWT, v.v.)
  server.js             // Điểm vào của server Express
Quan hệ:
1. Quan hệ giữa Người dùng (User) và Bài đăng (Post):
Quan hệ: Một người dùng có thể tạo nhiều bài đăng (1:N).
Mô tả: Một người dùng có thể tạo ra nhiều bài đăng, nhưng mỗi bài đăng chỉ thuộc về một người dùng. Quan hệ này được thể hiện qua khóa ngoại UserID trong bảng bài đăng.
2. Quan hệ giữa Người dùng (User) và Chia sẻ (Shares):
Quan hệ: Một người dùng có thể chia sẻ nhiều bài đăng (1:N).
Mô tả: Người dùng có thể chia sẻ một hoặc nhiều bài đăng, và mỗi lần chia sẻ là một hành động duy nhất. Mối quan hệ này có thể được lưu trữ qua bảng Shares, với một UserID tham chiếu bài đăng mà họ chia sẻ.
3. Quan hệ giữa Bài đăng (Post) và Chia sẻ (Shares):
Quan hệ: Một bài đăng có thể được chia sẻ nhiều lần (1:N).
Mô tả: Một bài đăng có thể được nhiều người dùng chia sẻ. Mối quan hệ này được thể hiện qua bảng Shares, trong đó mỗi chia sẻ có PostID tham chiếu bài đăng mà nó chia sẻ.
4. Quan hệ giữa Người dùng (User) và Quyền (Permissions):
Quan hệ: Một người dùng có thể có nhiều quyền đối với các bài đăng (1:N).
Mô tả: Mỗi người dùng có thể có các quyền khác nhau đối với bài đăng của mình hoặc bài đăng của người khác (ví dụ: quyền xem, chỉnh sửa, xóa). Mối quan hệ này được thể hiện qua bảng Permissions, trong đó có UserID và PostID (hoặc ID bài đăng khác nếu là quyền đối với bài đăng của người khác).
5. Quan hệ giữa Người dùng (User) và Bạn bè (Friends):
Quan hệ: Một người dùng có thể có nhiều bạn bè (N:M).
Mô tả: Người dùng có thể kết bạn với nhiều người, và một người cũng có thể có nhiều bạn. Mối quan hệ này có thể được lưu trong bảng Friends, nơi mỗi bản ghi lưu trữ hai UserID (một là người gửi lời mời kết bạn và một là người nhận lời mời), cùng với trạng thái mối quan hệ bạn bè (đang chờ xử lý, đã chấp nhận, v.v.).
6. Quan hệ giữa Bài đăng (Post) và Quyền (Permissions):
Quan hệ: Một bài đăng có thể có nhiều quyền (1:N).
Mô tả: Mỗi bài đăng có thể có các quyền khác nhau, tùy thuộc vào những người dùng có quyền truy cập hoặc tương tác với bài đăng đó. Mối quan hệ này có thể được thể hiện qua bảng Permissions, với mỗi bản ghi lưu trữ PostID và perm_id.
7. Quan hệ giữa Chia sẻ (Shares) và Quyền (Permissions):
Quan hệ: Mỗi chia sẻ có thể liên quan đến nhiều quyền (1:N).
Mô tả: Việc chia sẻ bài đăng có thể bị hạn chế bởi các quyền truy cập (ví dụ: quyền xem bài đăng trước khi chia sẻ). Quan hệ này được thể hiện qua bảng Permissions, nơi lưu trữ quyền đối với bài đăng mà người dùng chia sẻ.


Thông tin
1. Người dùng (User):
Đại diện cho cá nhân trên nền tảng truyền thông xã hội.

UserID (khóa chính): Mỗi người dùng sẽ có một ID duy nhất để phân biệt với các người dùng khác.
Tên người dùng (Username): Tên duy nhất của người dùng mà họ sử dụng trên nền tảng để nhận diện.
Mật khẩu (Password): Mật khẩu được mã hóa, dùng để bảo vệ tài khoản của người dùng.
Email: Địa chỉ email liên kết với tài khoản người dùng, thường dùng cho việc phục hồi mật khẩu hoặc nhận thông báo.
2. Bài đăng (Post):
Đại diện cho các bài đăng do người dùng tạo ra trên nền tảng.

PostID (khóa chính): Mỗi bài đăng có một ID duy nhất.
UserID (khóa ngoại): Liên kết bài đăng với người dùng tạo ra nó.
Nội dung (Content): Nội dung bài đăng, có thể là văn bản, miêu tả, hoặc chú thích.
Media_type (Loại phương tiện): Xác định kiểu bài đăng: hình ảnh, video, văn bản, hay các loại khác.
Hiển thị (Visibility): Quy định mức độ công khai của bài đăng, ví dụ: công khai (public), riêng tư (private), chỉ bạn bè (friends-only).
3. Chia sẻ (Shares):
Đại diện cho việc người dùng chia sẻ bài đăng của mình hoặc người khác.

ShareID (khóa chính): ID duy nhất cho mỗi hành động chia sẻ.
Share_name: Tên chia sẻ (có thể là "chia sẻ với bạn bè", "chia sẻ công khai", v.v.).
Share_desc: Mô tả chi tiết về việc chia sẻ (ví dụ, “Chia sẻ bài viết này với nhóm bạn”).
Share_type: Loại chia sẻ (ví dụ, "chia sẻ trực tiếp", "chia sẻ qua tin nhắn", "chia sẻ qua mạng xã hội khác").
4. Quyền (Permissions):
Quyền truy cập đối với bài đăng hoặc tài khoản của người dùng.

perm_id (khóa chính): ID duy nhất cho mỗi quyền.
perm_name (Tên quyền): Tên quyền (ví dụ, "xem bài đăng", "chỉnh sửa bài đăng", "xóa bài đăng", v.v.).
5. Bạn bè (Friends):
Liên kết giữa người dùng với bạn bè trên nền tảng.

friend_id (khóa chính): ID duy nhất cho mỗi mối quan hệ bạn bè.
friend_name: Tên người bạn.
friend_username: Tên người dùng của bạn.
friend_add (Trạng thái kết bạn): Trạng thái của quan hệ bạn bè, ví dụ:
"Đang chờ xử lý" (Pending): Khi người dùng chưa chấp nhận lời mời kết bạn.
"Đã chấp nhận" (Accepted): Khi hai người dùng đã là bạn bè chính thức.
"Từ chối" (Rejected): Khi một trong hai người từ chối lời mời kết bạn.