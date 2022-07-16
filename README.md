# Перед первым запуском необходимо создать сертификат с помощью утилиты mkcert (Windows/macOs)

```shell
mkcert --install
mkcert localhost
```

Получившиеся файлы с расширением .pem скопировать в папку configs/cert.

Установить зависимости (установку зависимостей необходимо делать в сети VPN)

```shell
npm install
```

# Варианты запуска:

```shell
npm start
```

(запросы к апи будут проксироваться на урл указанный в файле configs/webpack.config.dev.js, в разделе
devServer.proxy)

```shell
npm run dev
```

(запросы к апи будут перенаправлены на «mock сервер» – роль которого выполняет библиотека msw.js)
