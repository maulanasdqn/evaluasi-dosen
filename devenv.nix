{ pkgs, ... }:

{
  packages = with pkgs; [ nodejs bun ];

  scripts.hello.exec = "echo Welcome to Evaluasi Dosen Dev Env!";

  enterShell = ''
    hello
  '';

  languages.typescript.enable = true;

}
