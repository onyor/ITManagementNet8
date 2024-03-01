namespace ITX.Domain.Constants
{
    /// <summary>
    /// <br>ASCII Karakter Tablosu (Char)</br>
    /// <br>İlk 128 Karakter (7 Bit)</br>
    /// </summary>
    public static class AsciiChars
    {
        /// <summary>
        /// <br>Ondalık: 0</br>
        /// <br>Onaltılık: 0x00</br>
        /// <br>Hiç (Null)</br>
        /// </summary>
        public const char Nul = (char)0x00;

        /// <summary>
        /// <br>Ondalık: 1</br>
        /// <br>Onaltılık: 0x01</br>
        /// <br>Başlık Başlangıcı (Start of Heading)</br>
        /// </summary>
        public const char Soh = (char)0x01;

        /// <summary>
        /// <br>Ondalık: 2</br>
        /// <br>Onaltılık: 0x02</br>
        /// <br>Metin Başlangıcı (Start of Text)</br>
        /// </summary>
        public const char Stx = (char)0x02;

        /// <summary>
        /// <br>Ondalık: 3</br>
        /// <br>Onaltılık: 0x03</br>
        /// <br>Metin Bitişi (End of Text)</br>
        /// </summary>
        public const char Etx = (char)0x03;

        /// <summary>
        /// <br>Ondalık: 4</br>
        /// <br>Onaltılık: 0x04</br>
        /// <br>Aktarım Bitişi (End of Transmission)</br>
        /// </summary>
        public const char Eot = (char)0x04;

        /// <summary>
        /// <br>Ondalık: 5</br>
        /// <br>Onaltılık: 0x05</br>
        /// <br>Sorgu (Enquiry)</br>
        /// </summary>
        public const char Enq = (char)0x05;

        /// <summary>
        /// <br>Ondalık: 6</br>
        /// <br>Onaltılık: 0x06</br>
        /// <br>Onaylandı (Acknowledge)</br>
        /// </summary>
        public const char Ack = (char)0x06;

        /// <summary>
        /// <br>Ondalık: 7</br>
        /// <br>Onaltılık: 0x07</br>
        /// <br>Zil/Bip/Uyarı (Bell)</br>
        /// </summary>
        public const char Bel = (char)0x07;

        /// <summary>
        /// <br>Ondalık: 8</br>
        /// <br>Onaltılık: 0x08</br>
        /// <br>Geriye Doğru Sil (Backspace)</br>
        /// </summary>
        public const char Bs = (char)0x08;

        /// <summary>
        /// <br>Ondalık: 9</br>
        /// <br>Onaltılık: 0x09</br>
        /// <br>Sekme (Horizontal Tab)</br>
        /// </summary>
        public const char Ht = (char)0x09;

        /// <summary>
        /// <br>Ondalık: 10</br>
        /// <br>Onaltılık: 0x0A</br>
        /// <br>Satİr Besleme (Line Feed)</br>
        /// </summary>
        public const char Lf = (char)0x0A;

        /// <summary>
        /// <br>Ondalık: 11</br>
        /// <br>Onaltılık: 0x0B</br>
        /// <br>Dikey Sekme (Vertical Tab)</br>
        /// </summary>
        public const char Vt = (char)0x0B;

        /// <summary>
        /// <br>Ondalık: 12</br>
        /// <br>Onaltılık: 0x0C</br>
        /// <br>Form Besleme (Form Feed)</br>
        /// </summary>
        public const char Ff = (char)0x0C;

        /// <summary>
        /// <br>Ondalık: 13</br>
        /// <br>Onaltılık: 0x0D</br>
        /// <br>Satırbaşı (Carriage Return)</br>
        /// </summary>
        public const char Cr = (char)0x0D;

        /// <summary>
        /// <br>Ondalık: 14</br>
        /// <br>Onaltılık: 0x0E</br>
        /// <br>Dışarı Kaydır (Shift Out)</br>
        /// </summary>
        public const char So = (char)0x0E;

        /// <summary>
        /// <br>Ondalık: 15</br>
        /// <br>Onaltılık: 0x0F</br>
        /// <br>İçeri Kaydır (Shift In)</br>
        /// </summary>
        public const char Si = (char)0x0F;

        /// <summary>
        /// <br>Ondalık: 16</br>
        /// <br>Onaltılık: 0x10</br>
        /// <br>Veri Bağlantısı Kaçışı (Data Link Escape)</br>
        /// </summary>
        public const char Dle = (char)0x10;

        /// <summary>
        /// <br>Ondalık: 17</br>
        /// <br>Onaltılık: 0x11</br>
        /// <br>Cihaz Kontrol 1 (Device Control 1)</br>
        /// </summary>
        public const char Dc1 = (char)0x11;

        /// <summary>
        /// <br>Ondalık: 18</br>
        /// <br>Onaltılık: 0x12</br>
        /// <br>Cihaz Kontrol 2 (Device Control 2)</br>
        /// </summary>
        public const char Dc2 = (char)0x12;

        /// <summary>
        /// <br>Ondalık: 19</br>
        /// <br>Onaltılık: 0x13</br>
        /// <br>Cihaz Kontrol 3 (Device Control 3)</br>
        /// </summary>
        public const char Dc3 = (char)0x13;

        /// <summary>
        /// <br>Ondalık: 20</br>
        /// <br>Onaltılık: 0x14</br>
        /// <br>Cihaz Kontrol 4 (Device Control 4)</br>
        /// </summary>
        public const char Dc4 = (char)0x14;

        /// <summary>
        /// <br>Ondalık: 21</br>
        /// <br>Onaltılık: 0x15</br>
        /// <br>Onaylanmadı (Negative Acknowledge)</br>
        /// </summary>
        public const char Nak = (char)0x15;

        /// <summary>
        /// <br>Ondalık: 22</br>
        /// <br>Onaltılık: 0x16</br>
        /// <br>Senkron Boşta (Synchronous Idle)</br>
        /// </summary>
        public const char Syn = (char)0x16;

        /// <summary>
        /// <br>Ondalık: 23</br>
        /// <br>Onaltılık: 0x17</br>
        /// <br>Aktarım Bloğu Sonu (End of Transmission Block)</br>
        /// </summary>
        public const char Etb = (char)0x17;

        /// <summary>
        /// <br>Ondalık: 24</br>
        /// <br>Onaltılık: 0x18</br>
        /// <br>İptal (Cancel)</br>
        /// </summary>
        public const char Can = (char)0x18;

        /// <summary>
        /// <br>Ondalık: 25</br>
        /// <br>Onaltılık: 0x19</br>
        /// <br>Ortam Sonu (End of Medium)</br>
        /// </summary>
        public const char Em = (char)0x19;

        /// <summary>
        /// <br>Ondalık: 26</br>
        /// <br>Onaltılık: 0x1A</br>
        /// <br>Yerine Geç (Substitute)</br>
        /// </summary>
        public const char Sub = (char)0x1A;

        /// <summary>
        /// <br>Ondalık: 27</br>
        /// <br>Onaltılık: 0x1B</br>
        /// <br>Kaçış (Escape)</br>
        /// </summary>
        public const char Esc = (char)0x1B;

        /// <summary>
        /// <br>Ondalık: 28</br>
        /// <br>Onaltılık: 0x1C</br>
        /// <br>Dosya Ayırıcı (File Separator)</br>
        /// </summary>
        public const char Fs = (char)0x1C;

        /// <summary>
        /// <br>Ondalık: 29</br>
        /// <br>Onaltılık: 0x1D</br>
        /// <br>Grup Ayırıcı (Group Separator)</br>
        /// </summary>
        public const char Gs = (char)0x1D;

        /// <summary>
        /// <br>Ondalık: 30</br>
        /// <br>Onaltılık: 0x1E</br>
        /// <br>Kayıt Ayırıcı (Record Separator)</br>
        /// </summary>
        public const char Rs = (char)0x1E;

        /// <summary>
        /// <br>Ondalık: 31</br>
        /// <br>Onaltılık: 0x1F</br>
        /// <br>Birim Ayırıcı (Unit Separator)</br>
        /// </summary>
        public const char Us = (char)0x1F;

        /// <summary>
        /// <br>Ondalık: 32</br>
        /// <br>Onaltılık: 0x20</br>
        /// <br>Boşluk (Space)</br>
        /// </summary>
        public const char Sp = (char)0x20;

        /// <summary>
        /// <br>Ondalık: 33</br>
        /// <br>Onaltılık: 0x21</br>
        /// <br>Ünlem İşareti (Exclamation Mark)</br>
        /// <br>!</br>
        /// </summary>
        public const char Exc = (char)0x21;

        /// <summary>
        /// <br>Ondalık: 34</br>
        /// <br>Onaltılık: 0x22</br>
        /// <br>Çift Tırnak (Quotation Mark)</br>
        /// <br>"</br>
        /// </summary>
        public const char Quo = (char)0x22;

        /// <summary>
        /// <br>Ondalık: 35</br>
        /// <br>Onaltılık: 0x23</br>
        /// <br>Diyez (Number Sign, Sharp)</br>
        /// <br>#</br>
        /// </summary>
        public const char Number = (char)0x23;

        /// <summary>
        /// <br>Ondalık: 36</br>
        /// <br>Onaltılık: 0x24</br>
        /// <br>Dolar (Dollar Sign)</br>
        /// <br>$</br>
        /// </summary>
        public const char Dollar = (char)0x24;

        /// <summary>
        /// <br>Ondalık: 37</br>
        /// <br>Onaltılık: 0x25</br>
        /// <br>Yüzde (Percent Sign)</br>
        /// <br>%</br>
        /// </summary>
        public const char Percent = (char)0x25;

        /// <summary>
        /// <br>Ondalık: 38</br>
        /// <br>Onaltılık: 0x26</br>
        /// <br>Ve (Ampersand, And)</br>
        /// <br>&amp;</br>
        /// </summary>
        public const char Ampersand = (char)0x26;

        /// <summary>
        /// <br>Ondalık: 39</br>
        /// <br>Onaltılık: 0x27</br>
        /// <br>Tek Tırnak (Apostrophe)</br>
        /// <br>'</br>
        /// </summary>
        public const char Apostrophe = (char)0x27;

        /// <summary>
        /// <br>Ondalık: 40</br>
        /// <br>Onaltılık: 0x28</br>
        /// <br>Parantez Aç (Left Parenthesis)</br>
        /// <br>(</br>
        /// </summary>
        public const char LeftParenthesis = (char)0x28;

        /// <summary>
        /// <br>Ondalık: 41</br>
        /// <br>Onaltılık: 0x29</br>
        /// <br>Parantez Kapat (Right Parenthesis)</br>
        /// <br>)</br>
        /// </summary>
        public const char RightParenthesis = (char)0x29;

        /// <summary>
        /// <br>Ondalık: 42</br>
        /// <br>Onaltılık: 0x2A</br>
        /// <br>Yıldız, Çarpma (Asterisk)</br>
        /// <br>*</br>
        /// </summary>
        public const char Asterisk = (char)0x2A;

        /// <summary>
        /// <br>Ondalık: 43</br>
        /// <br>Onaltılık: 0x2B</br>
        /// <br>Pozitif/Toplama (Plus Sign)</br>
        /// <br>+</br>
        /// </summary>
        public const char Plus = (char)0x2B;

        /// <summary>
        /// <br>Ondalık: 44</br>
        /// <br>Onaltılık: 0x2C</br>
        /// <br>Virgül (Comma)</br>
        /// <br>,</br>
        /// </summary>
        public const char Comma = (char)0x2C;

        /// <summary>
        /// <br>Ondalık: 45</br>
        /// <br>Onaltılık: 0x2D</br>
        /// <br>Negatif/Çıkarma (Hyphen Minus Sign)</br>
        /// <br>-</br>
        /// </summary>
        public const char HyphenMinus = (char)0x2D;

        /// <summary>
        /// <br>Ondalık: 46</br>
        /// <br>Onaltılık: 0x2E</br>
        /// <br>Nokta (Full Stop, Period, Dot)</br>
        /// <br>.</br>
        /// </summary>
        public const char FullStop = (char)0x2E;

        /// <summary>
        /// <br>Ondalık: 47</br>
        /// <br>Onaltılık: 0x2F</br>
        /// <br>Slaş/Bölme (Slash, Solidus)</br>
        /// <br>/</br>
        /// </summary>
        public const char Slash = (char)0x2F;

        /// <summary>
        /// <br>Ondalık: 48</br>
        /// <br>Onaltılık: 0x30</br>
        /// <br>Sıfır Rakamı (Digit 0)</br>
        /// <br>0</br>
        /// </summary>
        public const char Digit0 = (char)0x30;

        /// <summary>
        /// <br>Ondalık: 49</br>
        /// <br>Onaltılık: 0x31</br>
        /// <br>Bir Rakamı (Digit 1)</br>
        /// <br>1</br>
        /// </summary>
        public const char Digit1 = (char)0x31;

        /// <summary>
        /// <br>Ondalık: 50</br>
        /// <br>Onaltılık: 0x32</br>
        /// <br>İki Rakamı (Digit 2)</br>
        /// <br>2</br>
        /// </summary>
        public const char Digit2 = (char)0x32;

        /// <summary>
        /// <br>Ondalık: 51</br>
        /// <br>Onaltılık: 0x33</br>
        /// <br>Üç Rakamı (Digit 3)</br>
        /// <br>3</br>
        /// </summary>
        public const char Digit3 = (char)0x33;

        /// <summary>
        /// <br>Ondalık: 52</br>
        /// <br>Onaltılık: 0x34</br>
        /// <br>Dört Rakamı (Digit 4)</br>
        /// <br>4</br>
        /// </summary>
        public const char Digit4 = (char)0x34;

        /// <summary>
        /// <br>Ondalık: 53</br>
        /// <br>Onaltılık: 0x35</br>
        /// <br>Beş Rakamı (Digit 5)</br>
        /// <br>5</br>
        /// </summary>
        public const char Digit5 = (char)0x35;

        /// <summary>
        /// <br>Ondalık: 54</br>
        /// <br>Onaltılık: 0x36</br>
        /// <br>Altı Rakamı (Digit 6)</br>
        /// <br>6</br>
        /// </summary>
        public const char Digit6 = (char)0x36;

        /// <summary>
        /// <br>Ondalık: 55</br>
        /// <br>Onaltılık: 0x37</br>
        /// <br>Yedi Rakamı (Digit 7)</br>
        /// <br>7</br>
        /// </summary>
        public const char Digit7 = (char)0x37;

        /// <summary>
        /// <br>Ondalık: 56</br>
        /// <br>Onaltılık: 0x38</br>
        /// <br>Sekiz Rakamı (Digit 8)</br>
        /// <br>8</br>
        /// </summary>
        public const char Digit8 = (char)0x38;

        /// <summary>
        /// <br>Ondalık: 57</br>
        /// <br>Onaltılık: 0x39</br>
        /// <br>Dokuz Rakamı (Digit 9)</br>
        /// <br>9</br>
        /// </summary>
        public const char Digit9 = (char)0x39;

        /// <summary>
        /// <br>Ondalık: 58</br>
        /// <br>Onaltılık: 0x3A</br>
        /// <br>İki Nokta (Colon)</br>
        /// <br>:</br>
        /// </summary>
        public const char Colon = (char)0x3A;

        /// <summary>
        /// <br>Ondalık: 59</br>
        /// <br>Onaltılık: 0x3B</br>
        /// <br>Noktalı Virgül (Semicolon)</br>
        /// <br>;</br>
        /// </summary>
        public const char Semicolon = (char)0x3B;

        /// <summary>
        /// <br>Ondalık: 60</br>
        /// <br>Onaltılık: 0x3C</br>
        /// <br>Küçüktür (Less Than Sign)</br>
        /// <br><</br>
        /// </summary>
        public const char Less = (char)0x3C;

        /// <summary>
        /// <br>Ondalık: 61</br>
        /// <br>Onaltılık: 0x3D</br>
        /// <br>Eşittir (Equals Sign)</br>
        /// <br>=</br>
        /// </summary>
        public const char Equal = (char)0x3D;

        /// <summary>
        /// <br>Ondalık: 62</br>
        /// <br>Onaltılık: 0x3E</br>
        /// <br>Büyüktür (Greater Than Sign)</br>
        /// <br>></br>
        /// </summary>
        public const char Greater = (char)0x3E;

        /// <summary>
        /// <br>Ondalık: 63</br>
        /// <br>Onaltılık: 0x3F</br>
        /// <br>Soru İşareti (Question Mark)</br>
        /// <br>?</br>
        /// </summary>
        public const char Question = (char)0x3F;

        /// <summary>
        /// <br>Ondalık: 64</br>
        /// <br>Onaltılık: 0x40</br>
        /// <br>Et İşareti (At Sign, Commercial At)</br>
        /// <br>@</br>
        /// </summary>
        public const char At = (char)0x40;

        /// <summary>
        /// <br>Ondalık: 65</br>
        /// <br>Onaltılık: 0x41</br>
        /// <br>Büyük A Harfi (Capital Letter A)</br>
        /// <br>Capital Letter A</br>
        /// <br>A</br>
        /// </summary>
        public const char CapitalLetterA = (char)0x41;

        /// <summary>
        /// <br>Ondalık: 66</br>
        /// <br>Onaltılık: 0x42</br>
        /// <br>Büyük B Harfi (Capital Letter B)</br>
        /// <br>B</br>
        /// </summary>
        public const char CapitalLetterB = (char)0x42;

        /// <summary>
        /// <br>Ondalık: 67</br>
        /// <br>Onaltılık: 0x43</br>
        /// <br>Büyük C Harfi (Capital Letter C)</br>
        /// <br>C</br>
        /// </summary>
        public const char CapitalLetterC = (char)0x43;

        /// <summary>
        /// <br>Ondalık: 68</br>
        /// <br>Onaltılık: 0x44</br>
        /// <br>Büyük D Harfi (Capital Letter D)</br>
        /// <br>D</br>
        /// </summary>
        public const char CapitalLetterD = (char)0x44;

        /// <summary>
        /// <br>Ondalık: 69</br>
        /// <br>Onaltılık: 0x45</br>
        /// <br>Büyük E Harfi (Capital Letter E)</br>
        /// <br>E</br>
        /// </summary>
        public const char CapitalLetterE = (char)0x45;

        /// <summary>
        /// <br>Ondalık: 70</br>
        /// <br>Onaltılık: 0x46</br>
        /// <br>Büyük F Harfi (Capital Letter F)</br>
        /// <br>F</br>
        /// </summary>
        public const char CapitalLetterF = (char)0x46;

        /// <summary>
        /// <br>Ondalık: 71</br>
        /// <br>Onaltılık: 0x47</br>
        /// <br>Büyük G Harfi (Capital Letter G)</br>
        /// <br>G</br>
        /// </summary>
        public const char CapitalLetterG = (char)0x47;

        /// <summary>
        /// <br>Ondalık: 72</br>
        /// <br>Onaltılık: 0x48</br>
        /// <br>Büyük H Harfi (Capital Letter H)</br>
        /// <br>H</br>
        /// </summary>
        public const char CapitalLetterH = (char)0x48;

        /// <summary>
        /// <br>Ondalık: 73</br>
        /// <br>Onaltılık: 0x49</br>
        /// <br>Büyük I Harfi (Capital Letter I)</br>
        /// <br>I</br>
        /// </summary>
        public const char CapitalLetterI = (char)0x49;

        /// <summary>
        /// <br>Ondalık: 74</br>
        /// <br>Onaltılık: 0x4A</br>
        /// <br>Büyük J Harfi (Capital Letter J)</br>
        /// <br>J</br>
        /// </summary>
        public const char CapitalLetterJ = (char)0x4A;

        /// <summary>
        /// <br>Ondalık: 75</br>
        /// <br>Onaltılık: 0x4B</br>
        /// <br>Büyük K Harfi (Capital Letter K)</br>
        /// <br>K</br>
        /// </summary>
        public const char CapitalLetterK = (char)0x4B;

        /// <summary>
        /// <br>Ondalık: 76</br>
        /// <br>Onaltılık: 0x4C</br>
        /// <br>Büyük L Harfi (Capital Letter L)</br>
        /// <br>L</br>
        /// </summary>
        public const char CapitalLetterL = (char)0x4C;

        /// <summary>
        /// <br>Ondalık: 77</br>
        /// <br>Onaltılık: 0x4D</br>
        /// <br>Büyük M Harfi (Capital Letter M)</br>
        /// <br>M</br>
        /// </summary>
        public const char CapitalLetterM = (char)0x4D;

        /// <summary>
        /// <br>Ondalık: 78</br>
        /// <br>Onaltılık: 0x4E</br>
        /// <br>Büyük N Harfi (Capital Letter N)</br>
        /// <br>N</br>
        /// </summary>
        public const char CapitalLetterN = (char)0x4E;

        /// <summary>
        /// <br>Ondalık: 79</br>
        /// <br>Onaltılık: 0x4F</br>
        /// <br>Büyük O Harfi (Capital Letter O)</br>
        /// <br>O</br>
        /// </summary>
        public const char CapitalLetterO = (char)0x4F;

        /// <summary>
        /// <br>Ondalık: 80</br>
        /// <br>Onaltılık: 0x50</br>
        /// <br>Büyük P Harfi (Capital Letter P)</br>
        /// <br>P</br>
        /// </summary>
        public const char CapitalLetterP = (char)0x50;

        /// <summary>
        /// <br>Ondalık: 81</br>
        /// <br>Onaltılık: 0x51</br>
        /// <br>Büyük Q Harfi (Capital Letter Q)</br>
        /// <br>Q</br>
        /// </summary>
        public const char CapitalLetterQ = (char)0x51;

        /// <summary>
        /// <br>Ondalık: 82</br>
        /// <br>Onaltılık: 0x52</br>
        /// <br>Büyük R Harfi (Capital Letter R)</br>
        /// <br>R</br>
        /// </summary>
        public const char CapitalLetterR = (char)0x52;

        /// <summary>
        /// <br>Ondalık: 83</br>
        /// <br>Onaltılık: 0x53</br>
        /// <br>Büyük S Harfi (Capital Letter S)</br>
        /// <br>S</br>
        /// </summary>
        public const char CapitalLetterS = (char)0x53;

        /// <summary>
        /// <br>Ondalık: 84</br>
        /// <br>Onaltılık: 0x54</br>
        /// <br>Büyük T Harfi (Capital Letter T)</br>
        /// <br>T</br>
        /// </summary>
        public const char CapitalLetterT = (char)0x54;

        /// <summary>
        /// <br>Ondalık: 85</br>
        /// <br>Onaltılık: 0x55</br>
        /// <br>Büyük U Harfi (Capital Letter U)</br>
        /// <br>U</br>
        /// </summary>
        public const char CapitalLetterU = (char)0x55;

        /// <summary>
        /// <br>Ondalık: 86</br>
        /// <br>Onaltılık: 0x56</br>
        /// <br>Büyük V Harfi (Capital Letter V)</br>
        /// <br>V</br>
        /// </summary>
        public const char CapitalLetterV = (char)0x56;

        /// <summary>
        /// <br>Ondalık: 87</br>
        /// <br>Onaltılık: 0x57</br>
        /// <br>Büyük W Harfi (Capital Letter W)</br>
        /// <br>W</br>
        /// </summary>
        public const char CapitalLetterW = (char)0x57;

        /// <summary>
        /// <br>Ondalık: 88</br>
        /// <br>Onaltılık: 0x58</br>
        /// <br>Büyük X Harfi (Capital Letter X)</br>
        /// <br>X</br>
        /// </summary>
        public const char CapitalLetterX = (char)0x58;

        /// <summary>
        /// <br>Ondalık: 89</br>
        /// <br>Onaltılık: 0x59</br>
        /// <br>Büyük Y Harfi (Capital Letter Y)</br>
        /// <br>Y</br>
        /// </summary>
        public const char CapitalLetterY = (char)0x59;

        /// <summary>
        /// <br>Ondalık: 90</br>
        /// <br>Onaltılık: 0x5A</br>
        /// <br>Büyük Z Harfi (Capital Letter Z)</br>
        /// <br>Z</br>
        /// </summary>
        public const char CapitalLetterZ = (char)0x5A;

        /// <summary>
        /// <br>Ondalık: 91</br>
        /// <br>Onaltılık: 0x5B</br>
        /// <br>Köşeli Parantez Aç (Left Square Bracket)</br>
        /// <br>[</br>
        /// </summary>
        public const char LeftSquareBracket = (char)0x5B;

        /// <summary>
        /// <br>Ondalık: 92</br>
        /// <br>Onaltılık: 0x5C</br>
        /// <br>Ters Slaş (Back Slash)</br>
        /// <br>\</br>
        /// </summary>
        public const char Backslash = (char)0x5C;

        /// <summary>
        /// <br>Ondalık: 93</br>
        /// <br>Onaltılık: 0x5D</br>
        /// <br>Köşeli Parantez Kapat (Right Square Bracket)</br>
        /// <br>]</br>
        /// </summary>
        public const char RightSquareBracket = (char)0x5D;

        /// <summary>
        /// <br>Ondalık: 94</br>
        /// <br>Onaltılık: 0x5E</br>
        /// <br>İnceltme (Circumflex Accent)</br>
        /// <br>^</br>
        /// </summary>
        public const char CircumflexAccent = (char)0x5E;

        /// <summary>
        /// <br>Ondalık: 95</br>
        /// <br>Onaltılık: 0x5F</br>
        /// <br>Alt Çizgi (Low Line, Underscore)</br>
        /// <br>_</br>
        /// </summary>
        public const char LowLine = (char)0x5F;

        /// <summary>
        /// <br>Ondalık: 96</br>
        /// <br>Onaltılık: 0x60</br>
        /// <br>Aksan İşareti (Grave Accent)</br>
        /// <br>`</br>
        /// </summary>
        public const char GraveAccent = (char)0x60;

        /// <summary>
        /// <br>Ondalık: 97</br>
        /// <br>Onaltılık: 0x61</br>
        /// <br>Küçük A Harfi (Small Letter A)</br>
        /// <br>a</br>
        /// </summary>
        public const char SmallLetterA = (char)0x61;

        /// <summary>
        /// <br>Ondalık: 98</br>
        /// <br>Onaltılık: 0x62</br>
        /// <br>Küçük B Harfi (Small Letter B)</br>
        /// <br>b</br>
        /// </summary>
        public const char SmallLetterB = (char)0x62;

        /// <summary>
        /// <br>Ondalık: 99</br>
        /// <br>Onaltılık: 0x63</br>
        /// <br>Küçük C Harfi (Small Letter C)</br>
        /// <br>c</br>
        /// </summary>
        public const char SmallLetterC = (char)0x63;

        /// <summary>
        /// <br>Ondalık: 100</br>
        /// <br>Onaltılık: 0x64</br>
        /// <br>Küçük D Harfi (Small Letter D)</br>
        /// <br>d</br>
        /// </summary>
        public const char SmallLetterD = (char)0x64;

        /// <summary>
        /// <br>Ondalık: 101</br>
        /// <br>Onaltılık: 0x65</br>
        /// <br>Küçük E Harfi (Small Letter E)</br>
        /// <br>e</br>
        /// </summary>
        public const char SmallLetterE = (char)0x65;

        /// <summary>
        /// <br>Ondalık: 102</br>
        /// <br>Onaltılık: 0x66</br>
        /// <br>Küçük F Harfi (Small Letter F)</br>
        /// <br>f</br>
        /// </summary>
        public const char SmallLetterF = (char)0x66;

        /// <summary>
        /// <br>Ondalık: 103</br>
        /// <br>Onaltılık: 0x67</br>
        /// <br>Küçük G Harfi (Small Letter G)</br>
        /// <br>g</br>
        /// </summary>
        public const char SmallLetterG = (char)0x67;

        /// <summary>
        /// <br>Ondalık: 104</br>
        /// <br>Onaltılık: 0x68</br>
        /// <br>Küçük H Harfi (Small Letter H)</br>
        /// <br>h</br>
        /// </summary>
        public const char SmallLetterH = (char)0x68;

        /// <summary>
        /// <br>Ondalık: 105</br>
        /// <br>Onaltılık: 0x69</br>
        /// <br>Küçük İ Harfi (Small Letter I)</br>
        /// <br>i</br>
        /// </summary>
        public const char SmallLetterI = (char)0x69;

        /// <summary>
        /// <br>Ondalık: 106</br>
        /// <br>Onaltılık: 0x6A</br>
        /// <br>Küçük J Harfi (Small Letter J)</br>
        /// <br>j</br>
        /// </summary>
        public const char SmallLetterJ = (char)0x6A;

        /// <summary>
        /// <br>Ondalık: 107</br>
        /// <br>Onaltılık: 0x6B</br>
        /// <br>Küçük K Harfi (Small Letter K)</br>
        /// <br>k</br>
        /// </summary>
        public const char SmallLetterK = (char)0x6B;

        /// <summary>
        /// <br>Ondalık: 108</br>
        /// <br>Onaltılık: 0x6C</br>
        /// <br>Küçük L Harfi (Small Letter L)</br>
        /// <br>l</br>
        /// </summary>
        public const char SmallLetterL = (char)0x6C;

        /// <summary>
        /// <br>Ondalık: 109</br>
        /// <br>Onaltılık: 0x6D</br>
        /// <br>Küçük M Harfi (Small Letter M)</br>
        /// <br>m</br>
        /// </summary>
        public const char SmallLetterM = (char)0x6D;

        /// <summary>
        /// <br>Ondalık: 110</br>
        /// <br>Onaltılık: 0x6E</br>
        /// <br>Küçük N Harfi (Small Letter N)</br>
        /// <br>n</br>
        /// </summary>
        public const char SmallLetterN = (char)0x6E;

        /// <summary>
        /// <br>Ondalık: 111</br>
        /// <br>Onaltılık: 0x6F</br>
        /// <br>Küçük O Harfi (Small Letter O)</br>
        /// <br>o</br>
        /// </summary>
        public const char SmallLetterO = (char)0x6F;

        /// <summary>
        /// <br>Ondalık: 112</br>
        /// <br>Onaltılık: 0x70</br>
        /// <br>Küçük P Harfi (Small Letter P)</br>
        /// <br>p</br>
        /// </summary>
        public const char SmallLetterP = (char)0x70;

        /// <summary>
        /// <br>Ondalık: 113</br>
        /// <br>Onaltılık: 0x71</br>
        /// <br>Küçük Q Harfi (Small Letter Q)</br>
        /// <br>q</br>
        /// </summary>
        public const char SmallLetterQ = (char)0x71;

        /// <summary>
        /// <br>Ondalık: 114</br>
        /// <br>Onaltılık: 0x72</br>
        /// <br>Küçük R Harfi (Small Letter R)</br>
        /// <br>r</br>
        /// </summary>
        public const char SmallLetterR = (char)0x72;

        /// <summary>
        /// <br>Ondalık: 115</br>
        /// <br>Onaltılık: 0x73</br>
        /// <br>Küçük S Harfi (Small Letter S)</br>
        /// <br>s</br>
        /// </summary>
        public const char SmallLetterS = (char)0x73;

        /// <summary>
        /// <br>Ondalık: 116</br>
        /// <br>Onaltılık: 0x74</br>
        /// <br>Küçük T Harfi (Small Letter T)</br>
        /// <br>t</br>
        /// </summary>
        public const char SmallLetterT = (char)0x74;

        /// <summary>
        /// <br>Ondalık: 117</br>
        /// <br>Onaltılık: 0x75</br>
        /// <br>Küçük U Harfi (Small Letter U)</br>
        /// <br>u</br>
        /// </summary>
        public const char SmallLetterU = (char)0x75;

        /// <summary>
        /// <br>Ondalık: 118</br>
        /// <br>Onaltılık: 0x76</br>
        /// <br>Küçük V Harfi (Small Letter V)</br>
        /// <br>v</br>
        /// </summary>
        public const char SmallLetterV = (char)0x76;

        /// <summary>
        /// <br>Ondalık: 119</br>
        /// <br>Onaltılık: 0x77</br>
        /// <br>Küçük W Harfi (Small Letter W)</br>
        /// <br>w</br>
        /// </summary>
        public const char SmallLetterW = (char)0x77;

        /// <summary>
        /// <br>Ondalık: 120</br>
        /// <br>Onaltılık: 0x78</br>
        /// <br>Küçük X Harfi (Small Letter X)</br>
        /// <br>x</br>
        /// </summary>
        public const char SmallLetterX = (char)0x78;

        /// <summary>
        /// <br>Ondalık: 121</br>
        /// <br>Onaltılık: 0x79</br>
        /// <br>Küçük Y Harfi (Small Letter Y)</br>
        /// <br>y</br>
        /// </summary>
        public const char SmallLetterY = (char)0x79;

        /// <summary>
        /// <br>Ondalık: 122</br>
        /// <br>Onaltılık: 0x7A</br>
        /// <br>Küçük Z Harfi (Small Letter Z)</br>
        /// <br>z</br>
        /// </summary>
        public const char SmallLetterZ = (char)0x7A;

        /// <summary>
        /// <br>Ondalık: 123</br>
        /// <br>Onaltılık: 0x7B</br>
        /// <br>Süslü Parantez Aç (Left Curly Bracket)</br>
        /// <br>{</br>
        /// </summary>
        public const char LeftCurlyBracket = (char)0x7B;

        /// <summary>
        /// <br>Ondalık: 124</br>
        /// <br>Onaltılık: 0x7C</br>
        /// <br>Dikey Çizgi (Vertical Bar, Pipe)</br>
        /// <br>|</br>
        /// </summary>
        public const char VerticalBar = (char)0x7C;

        /// <summary>
        /// <br>Ondalık: 125</br>
        /// <br>Onaltılık: 0x7D</br>
        /// <br>Süslü Parantez Kapat (Right Curly Bracket)</br>
        /// <br>}</br>
        /// </summary>
        public const char RightCurlyBracket = (char)0x7D;

        /// <summary>
        /// <br>Ondalık: 126</br>
        /// <br>Onaltılık: 0x7E</br>
        /// <br>Tilda (Tilde){</br>
        /// <br>{</br>
        /// </summary>
        public const char Tilde = (char)0x7E;

        /// <summary>
        /// <br>Ondalık: 127</br>
        /// <br>Onaltılık: 0x7F</br>
        /// <br>Sil (Delete)</br>
        /// </summary>
        public const char Del = (char)0x7F;
    }
}
