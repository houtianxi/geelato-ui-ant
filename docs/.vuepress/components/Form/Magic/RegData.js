export default {
  type: 'object',
  // 表单可绑定多实体，这是默认第一实体
  defaultEntity: 'platformUser',
  // update|create|read
  state: 'save',
  properties: {
    // 设置该id:{}，便于子实体中依赖该id
    id: {},
    name: {
      control: 'input',
      title: '姓名'
    },
    loginName: {
      control: 'input',
      title: '登录名',
      rules: {
        required: true
      }
    },
    password: {
      control: 'password',
      title: '密码',
      tips: '至少6位',
      rules: {
        required: true,
        min: 6
      }
    },
    confirmPassword: {
      control: 'password',
      title: '确认密码',
      rules: {
        required: true,
        min: 6,
        confirmed: 'password'
      }
    },
    email: {
      control: 'email',
      title: '邮箱',
      rules: {
        required: true,
        email: true
      },
      placeholder: 'xxx@xxx.xxx'
    },
    age: {
      control: 'input',
      title: '年龄',
      // 值
      value: '20',
      rules: {
        numeric: true
      }
    },
    avatar: {
      control: 'image',
      title: '头像',
      value: 'elliot',
    },
    sex: {
      control: 'select',
      title: '性别',
      // 若数据是动态生产成，可配置ds，基于ds加载的数据最终会设置到data中
      data: [
        {text: '保密', value: 'none'},
        {text: '男', value: 'male'},
        {text: '女', value: 'female'}
      ],
      value: 'none'
    },
    tel: {
      control: 'input',
      title: '电话',
      // 如果实体的字段名称与tel不一样，或因多实体都存在tel字段，可通过field指定，field未设置时，field:'tel'
      field: 'telephone',
      // 若字段需绑定其它实体，该通过该属性设置
      entity: 'platformUser',
      placeholder: '电话号码',
      rules: {
        required: true,
        numeric: true,
        //08613912345678
        max: 14
      }
    },
    province: {
      control: 'select',
      title: '省份',
      ds: 'province',
      // 广东省
      value: '440000'
    },
    city: {
      control: 'select',
      title: '城市',
      // 基于数据源，数源名称可自取，如cityDS，不一定需等于本属性名
      ds: 'city',
      js: "gs:$ctx.form.city=$ctx.form.province",
      // 当为data设置了数组项之后，默认激活项的索引
      defaultActiveIndex: 0
    },
    enable: {
      control: 'checkbox',
      title: '启用',
      value: true
    },
    description: {
      control: 'textarea',
      title: '描述'
    }
  },
  layout: {
    type: 'table',
    rows: [{
      cols: [
        {
          span: 12,
          rows: [{
            cols: [{span: 8, label: true, field: 'name'}, {span: 16, field: 'name'}]
          }, {
            cols: [{span: 8, label: true, field: 'sex'}, {span: 16, field: 'sex'}]
          }, {
            cols: [{span: 8, label: true, field: 'age'}, {span: 16, field: 'age'}]
          }, {
            cols: [{span: 8, label: true, field: 'tel'}, {span: 16, field: 'tel'}]
          }]
        },
        {span: 4, label: true, field: 'avatar'}, {span: 8, field: 'avatar'}
      ]
    }, {
      cols: [
        {span: 4, label: true, field: 'province'}, {span: 8, field: 'province'},
        {span: 4, label: true, field: 'city'}, {span: 8, field: 'city'}
      ]
    }, {
      // label为true时，展示的是property中title的内容，若需修改名称
      cols: [
        {span: 8, label: true, field: 'loginName'}, {span: 16, field: 'loginName'},
        {span: 8, label: true, field: 'email'}, {span: 16, field: 'email'}
      ]
    }, {
      cols: [
        {span: 4, label: true, field: 'password'}, {span: 8, field: 'password'},
        {span: 4, label: true, field: 'confirmPassword'}, {span: 8, field: 'confirmPassword'}
      ]
    }, {
      cols: [{
        span: 24, rows: [{cols: [{span: 4, label: true, field: 'description'}, {span: 20, field: 'description'}]}]
      }]
    }],
    hidden: {
      // 各表单状态，需隐藏的内容
      common: {
        typeA: 'gs:$ctx.form.type!=="typeA"',
        typeB: 'gs:$ctx.form.type!=="typeB"',
        typeC: 'gs:$ctx.form.type!=="typeC"'
      },
      update: {password: 1, confirmPassword: 2},
      create: {},
      read: {}
    }
  },
  ds: {
    province: {
      entity: 'platform_province',
      // default false
      lazy: false,
      // 支持字段重命名
      fields: 'name text,code value',
      description: '这是一个下拉列表数据源'
    },
    city: {
      entity: 'platform_city',
      lazy: true,
      fields: 'name text,code value',
      // 带参数查询的数据源
      params: {
        // 该信息会自动加入计算属性中，当province的值变动时，该数据源会重新加载计算
        provinceCode: 'gs:$ctx.form.province'
      },
      description: '这是一个下拉列表数据源，带参数'
    }
  },
  vars: {
    myVarA: {
      description: '这是一个变量，变量名字为myVarA，值为30',
      value: '30'
    }
  },
  watch: {
    'code': function () {

    }
  }
}