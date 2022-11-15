import { render } from '@react-email/render';

export default async function email(req, res) {
  try {
    const { path, json } = req.query;
    
    const Email = (await import(`../../../emails/${path}`)).default;
    const markup = render(<Email />, { pretty: true });
    
    if (json) {
      return res.json({ markup });
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(markup);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}