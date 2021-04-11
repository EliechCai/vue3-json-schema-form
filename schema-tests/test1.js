const Ajv = require('ajv')
const localize = require('ajv-i18n')
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      test: false,
      // minLength: 1,
      // format: 'email',
    },
    age: {
      type: 'number',
    },
    pets: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    isWorker: {
      type: 'boolean',
    },
  },
  required: ['name', 'age'],
}

// ajv.addFormat('test', data => {
//   console.log(data, '---------------')
//   return data === 'haha'
// })

ajv.addKeyword('test', {
  macro() {
    return {
      minLength: 20,
    }
  },
  // compile(sch, parentSchema) {
  //   console.log(sch, parentSchema)
  //   return () => true
  // },
  // // 校验关键字传入值
  // metaSchema: {
  //   type: 'boolean',
  // },
  // validate(schema, data) {
  //   // console.log(schema, data)
  //   if (schema === true) return true
  //   else return schema.length === 6
  // },
})

const validate = ajv.compile(schema)

const valid = validate({
  name: 'jokcy@xxx.com',
  age: 18,
  pets: ['mimi', 'mama'],
  isWorker: true,
})
if (!valid) {
  localize.zh(validate.errors)
  console.log(validate.errors)
}
