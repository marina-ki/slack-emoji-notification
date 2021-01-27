const { App } =require('@slack/bolt');
const dotenv =require('dotenv');
dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.event('emoji_changed', async ({ event, client }) => {
  try{
    console.log(event);

    if (event.subtype === 'add') {
      console.log('added!');
  
      const { name } = event;
      await client.chat.postMessage({
        channel: process.env.CHANNEL_ID,
        text: `🎉 A new emoji has been added! :${name}: \`:${name}:\``,
      });
    }
  }catch(e){
    console.error(e)
  }

});

(async () => {
  try{
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
  

  }catch(e){
    console.log(e)
  }

})();