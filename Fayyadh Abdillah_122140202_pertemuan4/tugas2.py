data_mahasiswa = [
    {
        "nama": "Fayyadh Abdillah",
        "nim": "202",
        "nilai_uts": 80,
        "nilai_uas": 85,
        "nilai_tugas": 90
    },
    {
        "nama": "Ani Wijaya",
        "nim": "246",
        "nilai_uts": 75,
        "nilai_uas": 65,
        "nilai_tugas": 80
    },
    {
        "nama": "Oniel",
        "nim": "012",
        "nilai_uts": 90,
        "nilai_uas": 92,
        "nilai_tugas": 88
    },
    {
        "nama": "Dodi Pratama",
        "nim": "048",
        "nilai_uts": 60,
        "nilai_uas": 55,
        "nilai_tugas": 70
    },
    {
        "nama": "Reva Fidela",
        "nim": "123",
        "nilai_uts": 45,
        "nilai_uas": 50,
        "nilai_tugas": 60
    }
]

for mahasiswa in data_mahasiswa:
    nilai_akhir = (0.3 * mahasiswa["nilai_uts"]) + (0.4 * mahasiswa["nilai_uas"]) + (0.3 * mahasiswa["nilai_tugas"])
    mahasiswa["nilai_akhir"] = nilai_akhir
    
    # Tentukan grade berdasarkan nilai akhir
    if nilai_akhir >= 80:
        grade = "A"
    elif nilai_akhir >= 70:
        grade = "B"
    elif nilai_akhir >= 60:
        grade = "C"
    elif nilai_akhir >= 50:
        grade = "D"
    else:
        grade = "E"
    
    mahasiswa["grade"] = grade

print("\nDAFTAR NILAI MAHASISWA")
print("="*80)
print("{:<5} {:<15} {:<10} {:<8} {:<8} {:<8} {:<12} {:<5}".format(
    "No", "Nama", "NIM", "UTS", "UAS", "Tugas", "Nilai Akhir", "Grade"))
print("-"*80)

for i, mahasiswa in enumerate(data_mahasiswa, 1):
    print("{:<5} {:<15} {:<10} {:<8} {:<8} {:<8} {:<12.2f} {:<5}".format(
        i,
        mahasiswa["nama"],
        mahasiswa["nim"],
        mahasiswa["nilai_uts"],
        mahasiswa["nilai_uas"],
        mahasiswa["nilai_tugas"],
        mahasiswa["nilai_akhir"],
        mahasiswa["grade"]
    ))

print("="*80)
nilai_tertinggi = max(data_mahasiswa, key=lambda x: x["nilai_akhir"])
nilai_terendah = min(data_mahasiswa, key=lambda x: x["nilai_akhir"])

print("\nMahasiswa dengan nilai tertinggi:")
print(f"Nama: {nilai_tertinggi['nama']}")
print(f"NIM: {nilai_tertinggi['nim']}")
print(f"Nilai Akhir: {nilai_tertinggi['nilai_akhir']:.2f}")
print(f"Grade: {nilai_tertinggi['grade']}")

print("\nMahasiswa dengan nilai terendah:")
print(f"Nama: {nilai_terendah['nama']}")
print(f"NIM: {nilai_terendah['nim']}")
print(f"Nilai Akhir: {nilai_terendah['nilai_akhir']:.2f}")
print(f"Grade: {nilai_terendah['grade']}")