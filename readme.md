
# Validador de contas bancárias

Este projeto valida números de agencia e conta bancárias de vários bancos e de forma offline. Compatível com nodejs ou webpack.

A validação da conta bancária é realizada sobre as regras dos seguintes bancos: Itaú, Bradesco, Banco do Brasil, Santander, Citibank e HSBC. Para os outros bancos é realizada uma validação padrão:

- Agência de 1 até 5 números
- Dígito da agência de 0 a 2 caracteres
- Conta corrente de 1 até 12 números
- Dígito da conta corrente de 0 a 2 caracteres

O número da agência e conta corrente dos bancos Itaú, Bradesco, e Banco do Brasil são validados através do cálculo do dígito verificador (semelhante a validação do CPF).

# Como utilizar:

Primeiro instale o pacote

`npm install br-bank-account-validator --save`

Importe o módulo na sua aplicação

```ts
import BankAccountValidator from "br-bank-account-validator";
```

Depois utilize o método `BankAccountValidator.validate` com os seguintes objetos: 
- `bankNumber`
- `agencyNumber`
- `agencyCheckNumber`
- `accountNumber`
- `accountCheckNumber`.

Se os dados não forem válidos uma erro será lançada com a descrição do problema

# Exemplo de utilização

```ts
import BankAccountValidator from "br-bank-account-validator";

try {
    BankAccountValidator.validate({
        bankNumber: "123",
        agencyNumber: "1234",
        agencyCheckNumber: "5",
        accountNumber: "12345",
        accountCheckNumber: "6",
    });
    // Se chegou até aqui, a conta bancária é válida

} catch (e) {
    // se não for válida, lança uma exceção
    console.log(e.message);
}
```

# Comportamento

Se os dados forem válidos, o código segue normalmente.

Se os dados não forem válidos, uma exceção do tipo `BankAccountValidatorException` é lançada com os seguintes parâmetros:

- `message`: Mensagem em português descrevendo todos os errors de por que os dados não são válidos
- `code`: Código de error do primeiro erro identificado. este código pode ser:
- `errors`: Um array de todos os erros contendo `message` e `code` cada um

# Códigos internos de erro

O parâmetro `code` pode assumir as seguintes opções:
- `INVALID_AGENCY_NUMBER`: A agência deve conter 4 números. Complete com zeros a esquerda se necessário
- `INVALID_AGENCY_CHECK_NUMBER`: Dígito da agência inválido
- `INVALID_ACCOUNT_NUMBER`: A conta corrente deve conter 5 números. Complete com zeros a esquerda se necessário
- `INVALID_ACCOUNT_CHECK_NUMBER`: Dígito da conta corrente inválido
- `AGENCY_CHECK_NUMBER_DONT_MATCH`: Dígito da agência não corresponde ao número da agência preenchido
- `ACCOUNT_CHECK_NUMBER_DONT_MATCH`: Dígito da conta não corresponde ao número da conta/agência preenchido
- `INVALID_BANK_NUMBER`: Banco inválido (quando o código do banco não possui entre 3 e 5 dígitos)


> Este projeto foi baseado no projeto https://github.com/wirecardBrasil/bank-account-validator-js.