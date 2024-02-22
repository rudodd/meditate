import clientPromise from '../../../lib/mongodb';

const defaultRoutine = {
  warmUp: false,
  warmUpLength: 1,
  whiteNoise: 'white-noise',
  length: 5,
  guided: 'full',
  secondaryQueue: 'singing-bowl',
  visualization: 'stillness',
}

export async function POST(req) {
  const { email } = await req.json();
  const client = await clientPromise;
  const db = client.db('meditate');
  const users = await db.collection('user').find({}).toArray();
  const matchingUser = users.find((user) => user.email === email);

  if (matchingUser) {
    return Response.json({ status: 200, user: matchingUser ? matchingUser : null })
  } else {
    const post = await db.collection('user').insertOne({ email: email, settings: defaultRoutine });
    return Response.json({ status: 200, user: post });
  }
}