(defn calculate-total [input]
  (map #(assoc % :total (* (:price %) (:quantity %))) input))

(def input
    [{:product-name "p1" :price 1 :quantity 10}
     {:product-name "p2" :price 1.2 :quantity 7}
     {:product-name "p3" :price 0.3 :quantity 2}])

(def output
    [{:product-name "p1" :price 1 :quantity 10  :total 10}
     {:product-name "p2" :price 1.2 :quantity 7  :total 8.4}
     {:product-name "p3" :price 0.3 :quantity 2  :total 0.6}])

(println(calculate-total input))