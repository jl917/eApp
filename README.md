# Test App

- arch
  - ia32
  - x64
  - armv7l
  - arm64
  - universal
  - mips64el

## 인증 관련

- https://blog.covelline.com/entry/2024/09/21/000000_1
- https://blog.csdn.net/hellodaixy/article/details/132480336

## 손상파일 열기

- sudo spctl --master-disable
- sudo xattr -d com.apple.quarantine /Applications/eapp-beta.app

## vite => rsbuild

- https://github.com/jl917/eApp/pull/48/commits/c959239c7c8d0390f4f5ea1e757b9e75874f3541

## 업데이트 관련

http://localhost:8080/updates/latest-mac.yml

```yml
version: 1.0.0-beta.20
files:
  - url: https://github.com/jl917/eApp/releases/download/v1.0.0-beta.18/eapp-beta-1.0.0-beta.17-arm64.dmg
    size: 3000000 # 파일 크기 (바이트)
path: YourApp-1.0.1.dmg
releaseDate: '2024-02-15'
```
