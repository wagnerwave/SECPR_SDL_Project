import os
from datetime import date
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from time import sleep

Website = "http://localhost:8080"
DriverPath = "./geckodriver"

class Bot_Test_auto:
    def __init__(self):
        self._Email = "admin1@admin1.fr"
        self._Username = "admin1_test"
        self._Password = "test1[admin]"
        self._driver = webdriver.Firefox(executable_path=DriverPath)
    
    def Register(self):
        self._driver.get(Website)
        self._driver.find_element_by_id("email").send_keys(self._Email)
        self._driver.find_element_by_id("username").send_keys(self._Username)
        self._driver.find_element_by_id("password").send_keys(self._Password)
        sleep(3)
        self._driver.find_element_by_id("submit").click()
        sleep(2)

    def Login(self):
        self._driver.find_element_by_id("username").send_keys(self._Username)
        self._driver.find_element_by_id("password").send_keys(self._Password)
        sleep(3)
        self._driver.find_element_by_id("submit").click()
        sleep(2)

    def test_weather(self):
        self._driver.find_element_by_id("Add-Weather").click()
        sleep(2)
        self._driver.find_element_by_id("city-weather").send_keys("Rennes")
        self._driver.find_element_by_id("country-weather").send_keys("France")
        self._driver.find_element_by_id("submit-weather").click()
        sleep(6)

    def test_github(self):
        self._driver.find_element_by_id("Add-Search-github").click()
        sleep(3)
        self._driver.find_element_by_id("github-search").send_keys("wagnerwave")
        self._driver.find_element_by_id("github-submit").click()
        sleep(6)

    def test_google(self):
        self._driver.find_element_by_id("Add-Search").click()
        sleep(3)
        self._driver.find_element_by_id("google-search").send_keys("Chanvre indien")
        self._driver.find_element_by_id("google-submit").click()
        sleep(6)


    def test_translate(self):
        self._driver.find_element_by_id("Add-Translate").click()
        sleep(3)
        self._driver.find_element_by_id("input-translate").send_keys("Hi, How are you ?")
        self._driver.find_element_by_id("submit-translate").click()
        sleep(6)


    def Dashboard(self):
        self.test_weather()
        self.test_github()
        self.test_google()
        self.test_translate()
        self._driver.find_element_by_id("Hide-Translate").click()
        sleep(2)
        self._driver.find_element_by_id("Hide-Search").click()
        sleep(2)
        self._driver.find_element_by_id("Hide-Search-github").click()
        sleep(2)
        self._driver.find_element_by_id("Hide-Weather").click()
        sleep(8)
        self._driver.find_element_by_id("logout-button").click()
        
    def Start(self):
        self.Register()
        self.Login()
        self.Dashboard()
        self._driver.quit()