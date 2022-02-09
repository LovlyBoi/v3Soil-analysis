const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      min: 4,
      max: 16,
      message: '长度在 4 到 16 个字符',
      trigger: 'blur',
    },
  ],
  pass: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 6,
      max: 20,
      message: '长度在 6 到 20 个字符',
      trigger: 'blur',
    },
  ],
}

export { rules }
