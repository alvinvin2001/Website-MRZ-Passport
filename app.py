import os
from flask import Flask, render_template, request, jsonify
from flask import send_from_directory
from flask_bootstrap import Bootstrap
# Impor library yang diperlukan untuk deteksi MRZ
from readmrz import MrzDetector, MrzReader

app = Flask(__name__)
bootstrap = Bootstrap(app)
app.config['UPLOAD_FOLDER'] = 'uploads'

# Inisialisasi objek detector dan reader MRZ
detector = MrzDetector()
reader = MrzReader()

# Fungsi untuk memproses gambar dan melakukan deteksi MRZ
def process_image(image_path):
    # Baca gambar dari path
    image = detector.read(image_path)

    # Lakukan proses pengolahan gambar
    resized = detector.resize(image)
    smoothed = detector.smooth(resized)
    dark = detector.find_dark_regions(smoothed)
    thresh = detector.apply_threshold(dark)

    # Menemukan koordinat MRZ
    y, y1, x, x1 = detector.find_coordinates(thresh, smoothed)

    # Jika koordinat MRZ tidak ditemukan, kembalikan None
    if y is None or y1 is None or x is None or x1 is None:
        return None

    # Membaca teks dari zona baca mesin
    code = reader.read_mrz(resized[y:y1, x:x1])
    return code

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/', methods=['GET', 'POST'])
def index():
    mrz_detected = False
    mrz_results = []
    total_images = 0
    mrz_detected_count = 0
    mrz_not_detected_count = 0

    if request.method == 'POST':
        # Cek apakah ada file yang diunggah oleh pengguna
        if 'file' in request.files:
            files = request.files.getlist('file')  # Get list of files
            total_images = len(files)

            for file in files:
                if file.filename != '':
                    filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
                    file.save(filename)
                    mrz_code = process_image(filename)

                    # Create a result dictionary for this file
                    result = {'filename': file.filename, 'code': None, 'fields': None}

                    if mrz_code:
                        # Cetak hasil deteksi MRZ di konsol server
                        print(f"MRZ Code for {file.filename}:")
                        print(mrz_code)
                        mrz_detected = True
                        try:
                            mrz_fields = reader.get_fields(mrz_code)
                            result['code'] = mrz_code
                            result['fields'] = mrz_fields
                            mrz_detected_count += 1
                        except Exception as e:
                            print("Error:", str(e))
                            print("MRZ Code Not Detected for", file.filename)
                            result['code'] = "Error: The MRZ code could not be detected."
                            result['fields'] = None
                            mrz_not_detected_count += 1
                    else:
                        print(f"MRZ Code Not Detected for {file.filename}")
                        result['code'] = "Error: The MRZ code could not be detected."
                        result['fields'] = None
                        mrz_not_detected_count += 1

                    mrz_results.append(result)

            # Tampilkan informasi di konsol server
            print("Total images:", total_images)
            print("MRZ Detected:", mrz_detected_count)
            print("MRZ Not Detected:", mrz_not_detected_count)

    return render_template('index.html', mrz_detected=mrz_detected, mrz_results=mrz_results,
                           total_images=total_images, mrz_detected_count=mrz_detected_count,
                           mrz_not_detected_count=mrz_not_detected_count)

if __name__ == '__main__':
    app.run(debug=True)
