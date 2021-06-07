const { Translate } = require('@google-cloud/translate').v2;

const { firebaseAdmin } = require('../../lib/firebaseAdmin');

export default async (req, res) => {

  const db = firebaseAdmin.database();

  const pathDatabase = `/users/${req.body.uid}/conversations/${req.body.conversationId}/${req.body.messageId}`;

  const result = await db.ref(pathDatabase).once('value');

  const data = result.val();

  const projectId = 'directed-tracer-314213';

  const translate = new Translate({ projectId : projectId});

  const [translation] = await translate.translate(data.originalMessage, req.body.language);

  const update = {};

  update[req.body.language] = translation;

  await db.ref(pathDatabase).update(update);


  res.status(200).json({ name: 'John Doe' })
}
