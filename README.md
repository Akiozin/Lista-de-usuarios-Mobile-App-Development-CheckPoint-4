# Gerenciador de Usuários App

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## 🎯 Sobre o Projeto

**Gerenciador de Usuários** é um aplicativo mobile desenvolvido em React Native e TypeScript, com o objetivo de demonstrar a implementação de um sistema CRUD (Create, Read, Update, Delete) completo. O app oferece uma interface simples e intuitiva para listar, adicionar, editar e excluir usuários, com todos os dados salvos localmente no dispositivo.

A ideia central é servir como um projeto de portfólio robusto, aplicando boas práticas de desenvolvimento mobile, incluindo componentização, tipagem estática e persistência de dados.

---

## ✨ Funcionalidades Principais

-   **Listagem Completa**: Visualização de todos os usuários cadastrados, exibindo avatar, nome e e-mail em uma lista clara e organizada.
-   **Adição de Novos Usuários**: Formulário intuitivo para cadastrar novos usuários, com campos para nome, e-mail e URL do avatar, incluindo validação para garantir que todos os campos sejam preenchidos.
-   **Edição de Dados**: Funcionalidade para selecionar um usuário da lista e modificar suas informações existentes.
-   **Exclusão Segura**: Opção para deletar um usuário, com um `Alert` de confirmação para prevenir exclusões acidentais.
-   **Persistência de Dados**: Utilização do `AsyncStorage` para salvar os dados localmente, garantindo que a lista de usuários permaneça intacta mesmo após fechar e reabrir o aplicativo.
-   **Navegação Eficiente**: Estrutura de navegação simples entre a tela de listagem e o formulário de adição/edição, gerenciada pelo React Navigation.
-   **Interface Responsiva**: Design limpo que se adapta a diferentes tamanhos de tela.

---

## 🚀 Tecnologias Utilizadas

-   **React Native:** Framework principal para o desenvolvimento do aplicativo.
-   **TypeScript:** Para adicionar tipagem estática, segurança e clareza ao código.
-   **React Navigation:** Para gerenciamento de todas as rotas e navegação entre as telas (Stack Navigator).
-   **AsyncStorage:** Para armazenamento local e persistente dos dados do usuário.
-   **Hermes Engine:** Motor JavaScript otimizado para React Native.

---

## 📦 Pacotes e Dependências

Para rodar este projeto, você precisará instalar as seguintes dependências:

```bash
# Navegação
npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context

# Armazenamento Local
npm install @react-native-async-storage/async-storage
