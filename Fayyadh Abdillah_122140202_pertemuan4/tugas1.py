berat = float(input("Masukkan berat badan (kg): "))
tinggi = float(input("Masukkan tinggi badan (m): "))

bmi = berat / (tinggi * tinggi)

if bmi < 18.5:
    kategori = "Berat badan kurang"
elif 18.5 <= bmi < 25:
    kategori = "Berat badan normal"
elif 25 <= bmi < 30:
    kategori = "Berat badan berlebih"
else:  # BMI >= 30
    kategori = "Obesitas"

# Tampilkan hasil
print("\nHasil Perhitungan BMI")
print("=====================")
print(f"Berat badan: {berat} kg")
print(f"Tinggi badan: {tinggi} m")
print(f"BMI: {bmi:.2f}")
print(f"Kategori: {kategori}")