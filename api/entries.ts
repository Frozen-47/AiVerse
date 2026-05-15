import { entries, typeFilters, taskFilters } from '../src/data';

export default function handler(req: any, res: any) {
  res.status(200).json({ entries, typeFilters, taskFilters });
}
