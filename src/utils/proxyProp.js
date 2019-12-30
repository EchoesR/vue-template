import Vue from "vue"
export function proxyProp(prop) {
  //使用Proxy可以拦截对象的动态生成的属性
  return new Proxy(prop, {
    set(target, key, value) {
      // console.log(target)
      if (prop[key] !== value) {
        Vue.set(prop, key, value)
      }
      return Reflect.set(target, key, value)
    }
  });
}
