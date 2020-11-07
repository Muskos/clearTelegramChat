class SettingsBase {
  constructor(db) {
    this.db = db;
    this.db.serialize(() => {
      this.db.run(
        'CREATE TABLE IF NOT EXISTS settings(chatId text, setting text, value text)',
        err => {
          if (err) {
            console.log(err);
            throw err;
          }
        }
      );
    });
  }

  saveSettings(settings) {
    this.db.run(
      `INSERT INTO settings(chatId, setting, value)
              VALUES(
                  '${settings.chatId}',
                  '${settings.setting}',
                  '${settings.value}')
        `,
      err => {
        if (err) {
          console.log(err);
          throw err;
        }
      }
    );
  }

  async getSettings(setting) {
    return await this.db.all(
      `SELECT chatId, setting, value FROM settings WHERE setting = '${setting}'`
    );
  }

  async getSettingsByChatId(chatId, setting) {
    return await this.db.all(
      `SELECT chatId, setting, value FROM settings WHERE chatId = '${chatId}' AND setting = '${setting}'`
    );
  }

  updateSettings(settings) {
    this.db.run(
      `UPDATE settings SET value = ${settings.value} WHERE chatId = '${settings.chatId}' AND setting = '${settings.setting}'`,
      err => {
        if (err) {
          console.log(err);
          throw err;
        }
      }
    );
  }
}

module.exports = {
  SettingsBase
};
