# Guia de Transferência - UseCoelhoBR para Nova Conta Manus

## 📋 Informações do Projeto

**Nome do Projeto:** UseCoelhoBR  
**Repositório GitHub:** https://github.com/Robson8748/usecoelho-site  
**Tipo:** E-commerce de Moda  
**Stack:** React 19 + Express + tRPC + MySQL + Tailwind CSS

---

## 🔐 Credenciais e Variáveis de Ambiente

### Mercado Pago (Pagamentos)
```
MERCADO_PAGO_ACCESS_TOKEN=APP_USR-1480824884876324-022313-3460c62c291011c524cabb91ef852350-3222329898
VITE_MERCADO_PAGO_PUBLIC_KEY=APP_USR-992ce204-c55d-479c-876d-31a6c4b6f031
MERCADO_PAGO_EMAIL=usecoelhobr@gmail.com
```

### Banco de Dados
- **Tipo:** MySQL
- **Tabelas:** users, products, orders, order_items, payments, inventory, addresses
- **Migrações:** Todas as migrações estão em `/drizzle/migrations/`

### Autenticação Manus OAuth
- Será configurada automaticamente pela nova conta Manus
- As variáveis `VITE_APP_ID`, `OAUTH_SERVER_URL`, etc. serão geradas automaticamente

---

## 📦 Dependências Principais

```json
{
  "dependencies": {
    "react": "^19.2.1",
    "express": "^4.21.2",
    "@trpc/server": "^11.6.0",
    "@trpc/react-query": "^11.6.0",
    "drizzle-orm": "^0.44.5",
    "mysql2": "^3.15.0",
    "nodemailer": "^8.0.1",
    "recharts": "^2.15.2",
    "tailwindcss": "^4.1.14"
  }
}
```

---

## 🚀 Passos para Transferir para Nova Conta

### 1. Na Nova Conta Manus
```bash
1. Faça login na nova conta Manus
2. Clique em "Criar Novo Projeto"
3. Escolha "Conectar ao GitHub"
4. Selecione: Robson8748/usecoelho-site
5. Aguarde a sincronização
```

### 2. Configurar Variáveis de Ambiente
Na seção **Settings → Secrets** da nova conta, adicione:

```
MERCADO_PAGO_ACCESS_TOKEN=APP_USR-1480824884876324-022313-3460c62c291011c524cabb91ef852350-3222329898
VITE_MERCADO_PAGO_PUBLIC_KEY=APP_USR-992ce204-c55d-479c-876d-31a6c4b6f031
MERCADO_PAGO_EMAIL=usecoelhobr@gmail.com
```

### 3. Configurar Banco de Dados
```bash
# Na nova conta, execute:
pnpm db:push
```

Isso criará todas as tabelas automaticamente.

### 4. Testar o Projeto
```bash
# O servidor iniciará automaticamente
# Acesse: https://[novo-subdominio].manus.space
```

---

## 📁 Estrutura do Projeto

```
usecoelho-site/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── pages/         # Páginas (Home, ProductDetail, AdminDashboard, CustomerDashboard)
│   │   ├── components/    # Componentes reutilizáveis
│   │   └── lib/           # Configuração tRPC
│   └── public/            # Assets estáticos
├── server/                # Backend Express
│   ├── routers.ts         # Rotas tRPC
│   ├── db.ts              # Helpers de banco de dados
│   ├── admin.db.ts        # Queries de admin
│   ├── address.db.ts      # Queries de endereço
│   ├── shipping.ts        # Cálculo de frete (Correios)
│   ├── payment.ts         # Integração Mercado Pago
│   ├── email.ts           # Notificações por email
│   ├── tracking.ts        # Rastreamento de pedidos
│   └── _core/             # Configuração interna
├── drizzle/               # Schema e migrações
│   └── schema.ts          # Definição das tabelas
└── package.json
```

---

## 🎯 Funcionalidades Implementadas

✅ **Loja Online**
- Homepage com produtos
- Páginas individuais de produtos com tamanhos (P, M, G, GG)
- Carrinho de compras funcional
- Desconto progressivo (3% a partir de 7 unidades)

✅ **Checkout**
- Cálculo de frete com API dos Correios (PAC, SEDEX)
- Pagamento com Mercado Pago (cartão, Pix, boleto)
- Salvamento de endereços do cliente
- Campos obrigatórios: número da casa
- Campos opcionais: complemento

✅ **Autenticação e Conta do Cliente**
- Login com Manus OAuth
- Dashboard do cliente (Minha Conta)
- Visualização de pedidos
- Rastreamento de pedidos
- Informações pessoais

✅ **Painel de Administração**
- Dashboard com estatísticas
- Gerenciamento de pedidos
- Visualização de pagamentos
- Controle de estoque
- Gráficos interativos
- Acesso restrito apenas para admin

✅ **Notificações**
- Emails automáticos para confirmação de pedido
- Emails de confirmação de pagamento
- Emails de notificação de envio

---

## 🔧 Configurações Adicionais Recomendadas

### 1. Email Real (Recomendado)
Atualmente usa simulação. Para emails reais:
- Configure SMTP real (SendGrid, AWS SES, Gmail)
- Edite `server/email.ts` com suas credenciais

### 2. Integração Real de Rastreamento
Atualmente usa simulação. Para rastreamento real:
- Integre com API dos Correios
- Edite `server/tracking.ts` com autenticação real

### 3. Domínio Customizado
- Na seção **Settings → Domains**, você pode:
  - Comprar um domínio direto no Manus
  - Conectar um domínio existente
  - Usar o subdomínio automático .manus.space

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs em **Dashboard → Logs**
2. Confirme que todas as variáveis de ambiente estão configuradas
3. Execute `pnpm db:push` para sincronizar o banco de dados
4. Contate suporte em **https://help.manus.im**

---

## ✨ Próximas Melhorias Sugeridas

1. **Integração de Email Real** - Usar SendGrid ou AWS SES para notificações genuínas
2. **Rastreamento em Tempo Real** - Integrar com API real dos Correios
3. **Sistema de Reviews** - Permitir que clientes avaliem produtos
4. **Cupons de Desconto** - Criar sistema de códigos promocionais
5. **Integração de Analytics** - Rastrear comportamento dos clientes

---

**Criado em:** 23 de Fevereiro de 2026  
**Versão do Projeto:** fca99e86
