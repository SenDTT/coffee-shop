import { seedAdminAccount } from "./seedAdminAccount";
import { seedCategories } from "./seedCategories";
import { seedProducts } from "./seedProducts";
import { seedSettings } from "./seedSettings";

seedAdminAccount();

seedSettings();

seedCategories();

seedProducts();
