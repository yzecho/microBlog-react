import { observable, action } from 'mobx'
import { getNoticeData, getReadedNoticeData, readNotice } from 'apis/message'
import { message } from 'antd'

class Store {
  @observable
  noticeMess = {
    messageList: [],
    count: 0
  }
  @observable
  readedNoticeMess = {
    messageList: [],
    count: 0
  }

  @action.bound
  async getNoticeData(userId) {
    try {
      const res = await getNoticeData(userId)
      if (res.data.success) {
        this.noticeMess = res.data.data
      }
    } catch{
      message.error('获取消息通知失败');
    }
  }

  @action.bound
  async getReadedNoticeData(userId) {
    try {
      const res = await getReadedNoticeData(userId)
      if (res.data.success) {
        this.readedNoticeMess = res.data.data
      }
    } catch{
      message.error('获取已经读取的消息失败');
    }
  }

  @action.bound
  async readNotice(userId) {
    try {
      const res = await readNotice(userId)
      if (res.data.success) {
        this.getNoticeData(userId)
      }
    } catch{
      message.error('已读消息失败');
    }
  }

}

export default new Store()