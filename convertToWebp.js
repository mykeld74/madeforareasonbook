import sharp from 'sharp';
import { readdir, unlink } from 'fs/promises';
import { join } from 'path';

const sourceDir = './src/lib/assets/pages';

async function convertToWebp() {
	try {
		// Read all files in the directory
		const files = await readdir(sourceDir);

		// Filter for jpg files
		const jpgFiles = files.filter(
			(file) => file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')
		);

		if (jpgFiles.length === 0) {
			console.log('No JPG files found in the directory.');
			return;
		}

		console.log(`Found ${jpgFiles.length} JPG files to convert...`);

		// Process each jpg file
		for (const file of jpgFiles) {
			const inputPath = join(sourceDir, file);
			const outputPath = join(sourceDir, `${file.split('.')[0]}.webp`);

			try {
				// Convert to webp
				await sharp(inputPath)
					.webp({ quality: 80 }) // 80% quality for good balance
					.toFile(outputPath);

				// Delete original jpg file
				await unlink(inputPath);

				console.log(`✓ Converted and removed: ${file}`);
			} catch (err) {
				console.error(`× Error processing ${file}:`, err.message);
			}
		}

		console.log('\nConversion completed! All JPG files have been converted to WebP format.');
	} catch (err) {
		console.error('Error reading directory:', err.message);
	}
}

// Run the conversion
convertToWebp();
