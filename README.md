# moonlight

 * `moonlight` 是一个前端库，它使写 `DAPP` 前端更容易和更可预测。`moonlight` 核心是基于 `Redux`，异步中间件使用的是 `Redux-saga`。我们负责同步您的合同数据、交易数据等。


## 数据结构(State)

```
{
  //账户列表，格式对象，key和value相同
  accounts:{eosname:'eosname'},
  //账户资源
  accountResources: {
    //对应的 eos 账户名字
    eosname:{
      //可用余额
      available:"9.0098 EOS",
      //赎回中
      refunding:"0.0000 EOS",
      //CPU Staked
      stakedCPU:"0.0000 EOS",
      //NET Staked
      stakedNET:"0.0000 EOS",
      //有他人质押
      stakedByOthers:"0.0000 EOS",
      //cpu 使用
      cpu_used:"10000",
      //cpu 总量
      cpu_max:"10000",
      //net 使用
      net_used:"10000",
      //net 总量
      net_max:"10000",
      //ram 使用
      ram_used:"10000",
      //ram 总量
      ram_max:"10000"
    }
  },
  //其他在eos上发行的代币 -- 暂定
  accountTokens:{
    //对应的 eos 账户名字
    eosname:{
      //对应的 token 名字，余额
      tokenname: "1.0000 EGT"
    }
  },
  //数据库列表
  contractTables:{
    //数据库表名字
    tableName:
  },
  //moonLight 库初始化状态
  moonLightStatus: {
    initialized
  },
  //记录每笔交易详情
  transactions: {
    txHash: {
      confirmations,
      error,
      receipt,
      status
    }
  },
  //每笔交易列表
  transactionStack,
  //eosjs 初始化状态
  eosjs: {
    status: 'initializing' | 'initialized' | 'failed'
  }
}
```

## 注意
 * 测试发现 eosjs 版本为 v16.0.9 时最稳定，所以该项目基于此版本开发，如后期 v20 版本加入正式我们会做兼容处理。
