# EasyTodo
Todo List - React Demo

## 部署
* 构建前端
```sh
cd easy-todo-frontend
npm run build
```

* 把前端构建的文件拷贝到后端，并重命名为 `frontend`
```sh
cp -rf build ../easy-todo-backend/
cd ../easy-todo-backend
mv build frontend
```

* 运行main.py
```sh
./main.py
```