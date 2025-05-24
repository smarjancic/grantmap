import fs from 'fs';
import path from 'path';
import { slugify } from '../lib/slugify';

const filePath = path.join(__dirname, '../data/sample-grants.json');
const grants = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const updated = grants.map((grant: any) => ({
	...grant,
	slug: slugify(grant.title),
}));

fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
console.log('✅ Slugs added to sample-grants.json');
