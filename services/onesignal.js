const axios = require("axios");
const { oneSignal } = require("../config");
const { boomify } = require("@hapi/boom");

exports.sendNotification = async ({ message, playerId }) => {
  try {
    await axios.post(
      `https://onesignal.com/api/v1/notifications`,
      {
        app_id: oneSignal.appId,
        contents: { en: message },
        include_player_ids: [playerId],
        data: { type: "single" },
        ios_sound: "single_sound.wav",
        android_sound: "single_sound",
      },
      { headers: { Authorization: `Basic ${oneSignal.appKey}` } }
    );
  } catch (err) {
    throw boomify(err);
  }
};
