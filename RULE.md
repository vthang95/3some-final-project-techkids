# Project rules

- Git team mình sẽ làm việc theo folk flow,
Mọi người folk lại project, làm phần của mình xong thì gửi pull request, mình sẽ review và merge vào nếu okie.

- Code convention

+ tabLength: 2
+ Dùng single quote '' thay vì double quote ""
+ object { property: 'value' } luôn để khoảng trống 2 bên
+ Nên đặt tên dài dễ đọc, tên hàm là cụm động từ, tên object, biến nên là danh từ
+ name convention:
   camelCase,
   Tên controller: user.controller.js
   Tên models: User.model.js

+ constant variales: CONSTANT_VARIABLE
+ Cố gắng viết theo kiểu immutable: const functionName = () => {}
  Những hàm hay biến nào mà xác định không thay đổi, không reassign thì để const, còn lại dùng let, không dùng var
+ Semicolon : luôn dùng ';'

Mình sẽ tiếp tục cập nhật rules
