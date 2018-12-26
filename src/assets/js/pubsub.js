/*eslint-disable*/
const pubsub = {
  // console.log(this)
  publish(TOPIC, msg) {
    console.log(this)
    // this.$stroe.dispatch('publish',{TOPIC, msg})
  },
  subscribe(TOPIC, mySubscriber) {}
}
export default pubsub
// todo 尽量减少用户对Store的了解
// todo 唯一性