const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    // Указываем путь к файлу
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            // Если файл не найден, читаем страницу 404
            fs.readFile(path.join(__dirname, '404.html'), 'utf8', (err404, data404) => {
                if (!err404) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(data404);
                } else {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end('<h1>500: Внутренняя ошибка сервера</h1>');
                }
            });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
}).listen(8080, () => {
    console.log('Сервер запущен на порту 8080');
});
