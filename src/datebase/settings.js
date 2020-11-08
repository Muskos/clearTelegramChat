const { QUERY } = require('../constants/query');
class SettingsBase {
  constructor(db) {
    this.db = db;
    this.db.run(QUERY.CREATE_SETTINGS_DB);
  }

  saveSettings(settings) {
    this.db.run(QUERY.INSERT_SETTINGS, [
      settings.chatId,
      settings.setting,
      settings.value
    ]);
  }

  async getSettings(setting) {
    return await this.db.all(QUERY.GET_SETTINGS, [setting]);
  }

  async getSettingsByChatId(chatId, setting) {
    return await this.db.all(QUERY.SELECT_CHAT_SETTINGS, [chatId, setting]);
  }

  updateSettings(settings) {
    this.db.run(QUERY.UPDATE_SETTINGS, [
      settings.value,
      settings.chatId,
      settings.setting
    ]);
  }
}

module.exports = {
  SettingsBase
};
