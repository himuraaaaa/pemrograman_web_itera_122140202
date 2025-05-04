from abc import ABC, abstractmethod
from datetime import datetime, timedelta

class LibraryItem(ABC):
    """Abstract base class untuk semua item perpustakaan"""
    
    def __init__(self, item_id, title, publisher, year):
        self._item_id = item_id
        self._title = title
        self._publisher = publisher
        self._year = year
        self._is_available = True
        self._borrowed_date = None
        self._return_date = None
    
    @property
    def item_id(self):
        return self._item_id
    
    @property
    def title(self):
        return self._title
    
    @property
    def is_available(self):
        return self._is_available
    
    @abstractmethod
    def display_info(self):
        """Method abstract yang harus diimplementasikan oleh subclass"""
        pass
    
    def borrow_item(self, days=14):
        """Meminjam item dari perpustakaan"""
        if self._is_available:
            self._is_available = False
            self._borrowed_date = datetime.now()
            self._return_date = self._borrowed_date + timedelta(days=days)
            return True
        return False
    
    def return_item(self):
        """Mengembalikan item ke perpustakaan"""
        if not self._is_available:
            self._is_available = True
            self._borrowed_date = None
            self._return_date = None
            return True
        return False
    
    def __str__(self):
        status = "Tersedia" if self._is_available else "Dipinjam"
        return f"{self._title} ({self._year}) - {status}"


class Book(LibraryItem):
    """Class untuk merepresentasikan buku"""
    
    def __init__(self, item_id, title, publisher, year, author, isbn, pages):
        super().__init__(item_id, title, publisher, year)
        self._author = author
        self._isbn = isbn
        self._pages = pages
    
    @property
    def author(self):
        return self._author
    
    @property
    def isbn(self):
        return self._isbn
    
    def display_info(self):
        """Implementasi method abstract dari parent class"""
        info = f"BUKU\n"
        info += f"ID: {self._item_id}\n"
        info += f"Judul: {self._title}\n"
        info += f"Penulis: {self._author}\n"
        info += f"Penerbit: {self._publisher}\n"
        info += f"Tahun: {self._year}\n"
        info += f"ISBN: {self._isbn}\n"
        info += f"Jumlah Halaman: {self._pages}\n"
        info += f"Status: {'Tersedia' if self._is_available else 'Dipinjam'}"
        if not self._is_available:
            info += f"\nTanggal Pengembalian: {self._return_date.strftime('%d-%m-%Y')}"
        return info


class Magazine(LibraryItem):
    """Class untuk merepresentasikan majalah"""
    
    def __init__(self, item_id, title, publisher, year, issue_number, category):
        super().__init__(item_id, title, publisher, year)
        self._issue_number = issue_number
        self._category = category
    
    @property
    def issue_number(self):
        return self._issue_number
    
    @property
    def category(self):
        return self._category
    
    def display_info(self):
        """Implementasi method abstract dari parent class"""
        info = f"MAJALAH\n"
        info += f"ID: {self._item_id}\n"
        info += f"Judul: {self._title}\n"
        info += f"Penerbit: {self._publisher}\n"
        info += f"Tahun: {self._year}\n"
        info += f"Edisi: {self._issue_number}\n"
        info += f"Kategori: {self._category}\n"
        info += f"Status: {'Tersedia' if self._is_available else 'Dipinjam'}"
        if not self._is_available:
            info += f"\nTanggal Pengembalian: {self._return_date.strftime('%d-%m-%Y')}"
        return info


class DVD(LibraryItem):
    """Class untuk merepresentasikan DVD"""
    
    def __init__(self, item_id, title, publisher, year, director, duration, genre):
        super().__init__(item_id, title, publisher, year)
        self._director = director
        self._duration = duration  # dalam menit
        self._genre = genre
    
    @property
    def director(self):
        return self._director
    
    @property
    def genre(self):
        return self._genre
    
    @property
    def duration(self):
        return self._duration
    
    @duration.setter
    def duration(self, value):
        if value > 0:
            self._duration = value
        else:
            raise ValueError("Durasi harus bernilai positif")
    
    def display_info(self):
        """Implementasi method abstract dari parent class"""
        info = f"DVD\n"
        info += f"ID: {self._item_id}\n"
        info += f"Judul: {self._title}\n"
        info += f"Sutradara: {self._director}\n"
        info += f"Penerbit: {self._publisher}\n"
        info += f"Tahun: {self._year}\n"
        info += f"Durasi: {self._duration} menit\n"
        info += f"Genre: {self._genre}\n"
        info += f"Status: {'Tersedia' if self._is_available else 'Dipinjam'}"
        if not self._is_available:
            info += f"\nTanggal Pengembalian: {self._return_date.strftime('%d-%m-%Y')}"
        return info


class Library:
    """Class untuk merepresentasikan perpustakaan"""
    
    def __init__(self, name):
        self.__name = name
        self.__items = {}  # Dictionary untuk menyimpan item: {item_id: item_object}
    
    @property
    def name(self):
        return self.__name
    
    @property
    def item_count(self):
        return len(self.__items)
    
    def add_item(self, item):
        """Menambahkan item ke koleksi perpustakaan"""
        if not isinstance(item, LibraryItem):
            raise TypeError("Item harus merupakan subclass dari LibraryItem")
        
        if item.item_id in self.__items:
            return False  # Item dengan ID tersebut sudah ada
        
        self.__items[item.item_id] = item
        return True
    
    def remove_item(self, item_id):
        """Menghapus item dari koleksi perpustakaan"""
        if item_id in self.__items:
            del self.__items[item_id]
            return True
        return False
    
    def get_item(self, item_id):
        """Mendapatkan item berdasarkan ID"""
        return self.__items.get(item_id)
    
    def search_by_title(self, title):
        """Mencari item berdasarkan judul (case insensitive)"""
        results = []
        for item in self.__items.values():
            if title.lower() in item.title.lower():
                results.append(item)
        return results
    
    def display_available_items(self):
        """Menampilkan semua item yang tersedia"""
        available_items = [item for item in self.__items.values() if item.is_available]
        return available_items
    
    def display_all_items(self):
        """Menampilkan semua item di perpustakaan"""
        return list(self.__items.values())
    
    def borrow_item(self, item_id):
        """Meminjam item dari perpustakaan"""
        item = self.get_item(item_id)
        if item and item.is_available:
            return item.borrow_item()
        return False
    
    def return_item(self, item_id):
        """Mengembalikan item ke perpustakaan"""
        item = self.get_item(item_id)
        if item and not item.is_available:
            return item.return_item()
        return False


# Program utama dengan menu interaktif
def load_sample_data(library):
    """Fungsi untuk memuat data sampel ke dalam perpustakaan"""
    # Menambahkan beberapa buku
    library.add_item(Book("B001", "Python Programming", "O'Reilly", 2020, "John Smith", "978-1234567890", 450))
    library.add_item(Book("B002", "Java Essentials", "Wiley", 2019, "Jane Doe", "978-0987654321", 380))
    library.add_item(Book("B003", "Data Science with Python", "Packt", 2021, "Alice Johnson", "978-5678901234", 520))
    
    # Menambahkan beberapa majalah
    library.add_item(Magazine("M001", "National Geographic", "NG Society", 2022, "January 2022", "Science"))
    library.add_item(Magazine("M002", "Time", "Time Inc", 2022, "February 2022", "News"))
    
    # Menambahkan DVD
    library.add_item(DVD("D001", "The Matrix", "Warner Bros", 1999, "Wachowski Brothers", 136, "Sci-Fi"))


def display_menu():
    """Menampilkan menu utama"""
    print("\n" + "="*50)
    print("SISTEM MANAJEMEN PERPUSTAKAAN".center(50))
    print("="*50)
    print("1. Tampilkan Semua Item")
    print("2. Tampilkan Item yang Tersedia")
    print("3. Cari Item berdasarkan Judul")
    print("4. Cari Item berdasarkan ID")
    print("5. Tambah Item Baru")
    print("6. Pinjam Item")
    print("7. Kembalikan Item")
    print("8. Hapus Item")
    print("0. Keluar")
    print("="*50)


def get_item_details():
    """Mendapatkan detail item dari input pengguna"""
    print("\n=== JENIS ITEM ===")
    print("1. Buku")
    print("2. Majalah")
    print("3. DVD")
    
    while True:
        try:
            choice = int(input("Pilih jenis item (1-3): "))
            if 1 <= choice <= 3:
                break
            else:
                print("Pilihan tidak valid. Silakan masukkan angka 1-3.")
        except ValueError:
            print("Input tidak valid. Masukkan angka.")
    
    item_id = input("ID Item: ")
    title = input("Judul: ")
    publisher = input("Penerbit: ")
    
    while True:
        try:
            year = int(input("Tahun: "))
            if 1800 <= year <= 2100:  # Validasi tahun dalam range yang masuk akal
                break
            else:
                print("Tahun tidak valid. Masukkan tahun antara 1800-2100.")
        except ValueError:
            print("Input tidak valid. Masukkan angka.")
    
    if choice == 1:  # Buku
        author = input("Penulis: ")
        isbn = input("ISBN: ")
        while True:
            try:
                pages = int(input("Jumlah Halaman: "))
                if pages > 0:
                    break
                else:
                    print("Jumlah halaman harus lebih dari 0.")
            except ValueError:
                print("Input tidak valid. Masukkan angka.")
        return Book(item_id, title, publisher, year, author, isbn, pages)
    
    elif choice == 2:  # Majalah
        issue_number = input("Nomor Edisi: ")
        category = input("Kategori: ")
        return Magazine(item_id, title, publisher, year, issue_number, category)
    
    else:  # DVD
        director = input("Sutradara: ")
        genre = input("Genre: ")
        while True:
            try:
                duration = int(input("Durasi (menit): "))
                if duration > 0:
                    break
                else:
                    print("Durasi harus lebih dari 0.")
            except ValueError:
                print("Input tidak valid. Masukkan angka.")
        return DVD(item_id, title, publisher, year, director, duration, genre)


if __name__ == "__main__":
    # Membuat objek perpustakaan
    perpus_name = input("Masukkan nama perpustakaan: ")
    perpus = Library(perpus_name)
    
    # Tanyakan apakah user ingin memuat data sampel
    load_sample = input("Apakah Anda ingin memuat data sampel? (y/n): ").lower()
    if load_sample == 'y':
        load_sample_data(perpus)
        print("Data sampel berhasil dimuat!")
    
    while True:
        display_menu()
        choice = input("Pilih menu (0-8): ")
        
        if choice == '0':
            print("\nTerima kasih telah menggunakan Sistem Manajemen Perpustakaan!")
            break
            
        elif choice == '1':  # Tampilkan semua item
            print(f"\n=== DAFTAR KOLEKSI {perpus.name.upper()} ===")
            items = perpus.display_all_items()
            if items:
                for i, item in enumerate(items, 1):
                    print(f"{i}. {item}")
            else:
                print("Tidak ada item dalam koleksi.")
                
        elif choice == '2':  # Tampilkan item tersedia
            print(f"\n=== ITEM TERSEDIA DI {perpus.name.upper()} ===")
            items = perpus.display_available_items()
            if items:
                for i, item in enumerate(items, 1):
                    print(f"{i}. {item}")
            else:
                print("Tidak ada item yang tersedia.")
                
        elif choice == '3':  # Cari berdasarkan judul
            keyword = input("\nMasukkan kata kunci judul: ")
            print(f"\n=== HASIL PENCARIAN '{keyword}' ===")
            results = perpus.search_by_title(keyword)
            if results:
                for i, item in enumerate(results, 1):
                    print(f"{i}. {item}")
            else:
                print("Tidak ditemukan item dengan judul tersebut.")
                
        elif choice == '4':  # Cari berdasarkan ID
            item_id = input("\nMasukkan ID item: ")
            item = perpus.get_item(item_id)
            if item:
                print("\n=== DETAIL ITEM ===")
                print(item.display_info())
            else:
                print(f"Item dengan ID '{item_id}' tidak ditemukan.")
                
        elif choice == '5':  # Tambah item baru
            try:
                new_item = get_item_details()
                if perpus.add_item(new_item):
                    print("\nItem berhasil ditambahkan!")
                else:
                    print("\nGagal menambahkan item. ID mungkin sudah ada.")
            except Exception as e:
                print(f"\nTerjadi kesalahan: {e}")
                
        elif choice == '6':  # Pinjam item
            item_id = input("\nMasukkan ID item yang ingin dipinjam: ")
            if perpus.borrow_item(item_id):
                print("Item berhasil dipinjam!")
                print(perpus.get_item(item_id).display_info())
            else:
                print("Gagal meminjam item. Item mungkin tidak tersedia atau ID tidak valid.")
                
        elif choice == '7':  # Kembalikan item
            item_id = input("\nMasukkan ID item yang ingin dikembalikan: ")
            if perpus.return_item(item_id):
                print("Item berhasil dikembalikan!")
                print(perpus.get_item(item_id).display_info())
            else:
                print("Gagal mengembalikan item. Item mungkin sudah tersedia atau ID tidak valid.")
                
        elif choice == '8':  # Hapus item
            item_id = input("\nMasukkan ID item yang ingin dihapus: ")
            if perpus.remove_item(item_id):
                print(f"Item dengan ID '{item_id}' berhasil dihapus.")
            else:
                print(f"Item dengan ID '{item_id}' tidak ditemukan.")
                
        else:
            print("\nPilihan tidak valid. Silakan pilih menu 0-8.")
        
        input("\nTekan Enter untuk melanjutkan...")