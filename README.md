CLI tool to heating M1 Mac in winter

### how to use

```shell
npm install -g m1-heating

m1-heating --thread 4 --interval 2 --min 20 --max 50
```
or you can use `npx` 

```shell
npx m1-heating --thread 4 --interval 2 --min 20 --max 50
```

### options

- `thread`: number of threads to heating your Mac 

- `intreval`: the seconds to check whether continue heating or not 

- `min`: the lowest temperature you can accept on your Mac

- `max`: the highest temperature you can accept on your Mac