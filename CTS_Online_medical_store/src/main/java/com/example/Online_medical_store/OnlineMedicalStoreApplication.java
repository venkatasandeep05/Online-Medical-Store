package com.example.Online_medical_store;

import com.example.Online_medical_store.controller.requestPOJO.LoginRequest;
import com.example.Online_medical_store.entity.Products;
import com.example.Online_medical_store.entity.Users;
import com.example.Online_medical_store.repository.ProductsRepository;
import com.example.Online_medical_store.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.annotation.PostConstruct;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootApplication
@ComponentScan
@EnableTransactionManagement
public class OnlineMedicalStoreApplication {

	@Autowired
	UsersRepository repo;

	@Autowired
	ProductsRepository productsRepository;

	@PostConstruct
	public void users() {
		List<Users> users = Stream.of(new Users(1, "nethan", "nethan@gmail.com", "password", "hyderabad", "22", "Male"),
				new Users(2, "sai", "sai@gmail.com", "passwor234d", "bangalore", "22", "Male"),
				new Users(3, "teja", "teja@gmail.com", "passwo334rd", "chennai", "22", "female"))
				.collect(Collectors.toList());
		repo.saveAll(users);
	}

	@PostConstruct
	public void products() {
		List<Products> products = Stream.of(
				new Products(1, "Amlokind-AT", 200,
						"https://res.cloudinary.com/sagarmish1234/image/upload/v1657429133/Online%20medical%20Store/miftpxsvqlqglppshbuj_k9qhs1.png",
						new Date(2021, 8, 14), 4000, "4.9", new Date(2022, 8, 12),
						"decription1"),
				new Products(2, "Aciloc-RD", 300,
						"https://res.cloudinary.com/sagarmish1234/image/upload/v1657429083/Online%20medical%20Store/fqhelwizhlko6xwwiptl_w6dl1p.png",
						new Date(2021, 8, 14), 4000, "4.5", new Date(2022, 8, 12),
						"decription2"),
				new Products(3, "Almox 500", 400,
						"https://res.cloudinary.com/sagarmish1234/image/upload/v1657429061/Online%20medical%20Store/h4y2f030gju0ftmou0t5_twq1mg.png",
						new Date(2021, 8, 14), 4000, "4.6", new Date(2022, 8, 12),
						"decription3"),
				new Products(4, "Asthalin Syrup", 300,
						"https://res.cloudinary.com/sagarmish1234/image/upload/v1657429028/Online%20medical%20Store/owsibqk5j4lws9wbmwma_nlbfv8.png",
						new Date(2021, 8, 14), 4000, "4.5", new Date(2022, 8, 12),
						"decription2"),
				new Products(5, "Amoxycillin", 300,
						"https://res.cloudinary.com/sagarmish1234/image/upload/v1657429008/Online%20medical%20Store/hg4gkjmjrg9956tqtmoz_xnv0ci.png",
						new Date(2021, 8, 14), 4000, "4.5", new Date(2022, 8, 12),
						"decription2"),
				new Products(6, "Avomine", 300,
						"https://res.cloudinary.com/sagarmish1234/image/upload/v1657428975/Online%20medical%20Store/tbb9sppofitfuhcbk85c_sv1ucn.png",
						new Date(2021, 8, 14), 4000, "4.5", new Date(2022, 8, 12),
						"decription2"),
				new Products(7, "Anovate", 300,
						"https://res.cloudinary.com/sagarmish1234/image/upload/v1657428942/Online%20medical%20Store/gnsem6ircqxmwmjkprkw_f4nxkt.png",
						new Date(2021, 8, 14), 4000, "4.5", new Date(2022, 8, 12),
						"decription2"),
				new Products(8, "Atrax", 300,
						"https://res.cloudinary.com/sagarmish1234/image/upload/v1657428914/Online%20medical%20Store/v9py58kciridvbi7bqls_umm8fy.png",
						new Date(2021, 8, 14), 4000, "4.5", new Date(2022, 8, 12),
						"decription2"),
				new Products(9, "Aciloc 150", 300,
						"https://res.cloudinary.com/sagarmish1234/image/upload/v1657428887/Online%20medical%20Store/pn7apngctvrtweencwi1_hsqtsk.png",
						new Date(2021, 8, 14), 4000, "4.5", new Date(2022, 8, 12),
						"decription2"),
				new Products(10, "Avil 25", 300,
						"https://res.cloudinary.com/sagarmish1234/image/upload/v1657428861/Online%20medical%20Store/mmsye6bf97tkcocat24j_jlj2fb.png",
						new Date(2021, 8, 14), 4000, "4.5", new Date(2022, 8, 12),
						"decription2"),
				new Products(11, "Allegra", 300,
						"https://res.cloudinary.com/sagarmish1234/image/upload/v1657428829/Online%20medical%20Store/b949nty485o1itezg3ya_v45a3w.png",
						new Date(2021, 8, 14), 4000, "4.5", new Date(2022, 8, 12),
						"decription2"),
				new Products(12, "Augmentin", 300,
						"https://res.cloudinary.com/sagarmish1234/image/upload/v1657428793/Online%20medical%20Store/wy2y9bdipmh6rgkrj0zm_ji5idu.png",
						new Date(2021, 8, 14), 4000, "4.5", new Date(2022, 8, 12),
						"decription2"),
				new Products(13, "Alfoo 10mg Tablet PR", 300,
						"https://onemg.gumlet.io/image/upload/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/v1600089256/cropped/a34pbmqti99hu1y1zz5r.jpgg",
						new Date(2021, 8, 14), 4000, "4.5", new Date(2022, 8, 12),
						"decription2"),
				new Products(14, "Azithral 200 Liquid", 300,
						"https://onemg.gumlet.io/image/upload/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/v1600089575/cropped/mbdxk2kboh3llijyaao2.jpg",
						new Date(2021, 8, 14), 4000, "4.5", new Date(2022, 8, 12),
						"decription2"),
				new Products(15, "Ascoril LS Junior Syrup", 300,
						"https://onemg.gumlet.io/image/upload/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/v1600171210/cropped/r22ftufqfbkaxevlo6wn.jpg",
						new Date(2021, 8, 14), 4000, "4.5", new Date(2022, 8, 12),
						"decription2"),
				new Products(16, "Asthalin 100mcg Inhaler", 300,
						"https://onemg.gumlet.io/image/upload/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/v1600091239/cropped/hqnb7foc1itgjxokrnjb.jpg",
						new Date(2021, 8, 14), 4000, "4.5", new Date(2022, 8, 12),
						"decription2"),
				new Products(17, "Azicip 500 Tablet", 300,
						"https://onemg.gumlet.io/image/upload/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/dwqhqfos0hlzsltrwraf.jpg",
						new Date(2021, 8, 14), 4000, "4.5", new Date(2022, 8, 12),
						"decription2"),
				new Products(18, "Aceclo Plus Tablet", 300,
						"https://onemg.gumlet.io/image/upload/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/v1600084382/cropped/qdjkuq9eipidsadmcosn.jpg",
						new Date(2021, 8, 14), 4000, "4.5", new Date(2022, 8, 12),
						"decription2"),
				new Products(19, "Azmarda 50mg Tablet", 300,
						"https://onemg.gumlet.io/image/upload/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/v1600179092/cropped/ud4pymcjxgaziyzgqhso.jpg",
						new Date(2021, 8, 14), 4000, "4.5", new Date(2022, 8, 12),
						"decription2"),
				new Products(20, "Augmentin DDS", 300,
						"https://onemg.gumlet.io/image/upload/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/v1600083149/cropped/kafbzrabyoihauyvnig4.jpg",
						new Date(2021, 8, 14), 4000, "4.5", new Date(2022, 8, 12),
						"decription2"))
				.collect(Collectors.toList());
		productsRepository.saveAll(products);
	}

	public static void main(String[] args) {
		SpringApplication.run(OnlineMedicalStoreApplication.class, args);
	}

}
