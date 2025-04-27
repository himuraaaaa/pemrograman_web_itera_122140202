
import math_operations

from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin

print("\n1. PERHITUNGAN GEOMETRI")
print("-" * 30)

sisi_persegi = 5
print(f"Persegi dengan sisi {sisi_persegi} satuan:")
print(f"- Luas: {math_operations.luas_persegi(sisi_persegi)} satuan²")
print(f"- Keliling: {math_operations.keliling_persegi(sisi_persegi)} satuan")

panjang = 6
lebar = 4
print(f"\nPersegi panjang dengan panjang {panjang} dan lebar {lebar} satuan:")
print(f"- Luas: {math_operations.luas_persegi_panjang(panjang, lebar)} satuan²")
print(f"- Keliling: {math_operations.keliling_persegi_panjang(panjang, lebar)} satuan")

radius = 7
print(f"\nLingkaran dengan radius {radius} satuan:")
print(f"- Luas: {math_operations.luas_lingkaran(radius):.2f} satuan²")
print(f"- Keliling: {math_operations.keliling_lingkaran(radius):.2f} satuan")
print(f"- Nilai PI yang digunakan: {math_operations.PI}")

print("\n2. KONVERSI SUHU")
print("-" * 30)

suhu_celsius = 25
print(f"Suhu {suhu_celsius}°C sama dengan:")
print(f"- {celsius_ke_fahrenheit(suhu_celsius):.2f}°F (menggunakan import fungsi)")
print(f"- {math_operations.celsius_ke_fahrenheit(suhu_celsius):.2f}°F (menggunakan import modul)")
print(f"- {celsius_ke_kelvin(suhu_celsius):.2f}K (menggunakan import fungsi)")

suhu_fahrenheit = 98.6
print(f"\nSuhu {suhu_fahrenheit}°F sama dengan:")
print(f"- {math_operations.fahrenheit_ke_celsius(suhu_fahrenheit):.2f}°C")

print("\n" + "=" * 50)