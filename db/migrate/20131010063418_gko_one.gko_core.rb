# This migration comes from gko_core (originally 20131015070500)
class GkoOne < ActiveRecord::Migration
  def up
    if table_exists?(:sites)
      #As for rails 4.0.0.beta1 migrations, it doesn't necessary to update indexes manually. AR updates it by itself.
      remove_index "assets", :name => "index_assets_on_site_id"
      rename_table "assets", "gko_assets"
      add_index "gko_assets", "site_id", :name => "gko_index_assets_on_site_id"
      
      remove_index "content_translations", :name => "index_content_translations_on_content_id"
      remove_index "content_translations", :name => "index_content_translations_on_locale"
      rename_table "content_translations", "gko_content_translations"
      rename_column "gko_content_translations", "content_id", "gko_content_id"
      add_index "gko_content_translations", ["gko_content_id"], :name => "gko_index_content_translations_on_content_id"
      add_index "gko_content_translations", ["locale"], :name => "gko_index_content_translations_on_locale"

      remove_index "contents", :name => "index_contents_on_access_count"
      remove_index "contents", :name => "index_contents_on_position_and_section_id"
      remove_index "contents", :name => "index_contents_on_section_id"
      remove_index "contents", :name => "index_contents_on_site_id"
      remove_index "contents", :name => "index_contents_on_slug"
      rename_table "contents", "gko_contents"
      add_index "gko_contents", ["access_count"], :name => "gko_index_contents_on_access_count"
      add_index "gko_contents", ["position", "section_id"], :name => "gko_index_contents_on_position_and_section_id"
      add_index "gko_contents", ["section_id"], :name => "gko_index_contents_on_section_id"
      add_index "gko_contents", ["site_id"], :name => "gko_index_contents_on_site_id"
      add_index "gko_contents", ["slug"], :name => "gko_index_contents_on_slug"
      
      remove_index "document_assignments", :name => "index_document_assignments_on_attachable_id_and_attachable_type"
      rename_table "document_assignments", "gko_document_assignments"
      add_index "gko_document_assignments", ["attachable_id", "attachable_type"], :name => "gko_index_document_assignments_on_attachable_id_and_type"

      remove_index "document_items", :name => "index_press_articles_on_country_id"
      remove_index "document_items", :name => "index_press_articles_on_section_id"
      remove_index "document_items", :name => "index_press_articles_on_site_id"
      rename_table "document_items", "gko_document_items"
      add_index "gko_document_items", ["country_id"], :name => "gko_index_press_articles_on_country_id"
      add_index "gko_document_items", ["section_id"], :name => "gko_index_press_articles_on_section_id"
      add_index "gko_document_items", ["site_id"], :name => "gko_index_press_articles_on_site_id"

      remove_index "document_translations", :name => "index_document_translations_on_document_id"
      remove_index "document_translations", :name => "index_document_translations_on_locale"
      rename_table "document_translations", "gko_document_translations"
      rename_column "gko_document_translations", "document_id", "gko_document_id"
      add_index "gko_document_translations", ["gko_document_id"], :name => "gko_index_document_translations_on_document_id"
      add_index "gko_document_translations", ["locale"], :name => "gko_index_document_translations_on_locale"

      rename_table "documents", "gko_documents"
      
      remove_index "image_assignments", :name => "index_image_assignments_on_attachable_id_and_attachable_type"
      rename_table "image_assignments", "gko_image_assignments"
      add_index "gko_image_assignments", ["attachable_id", "attachable_type"], :name => "gko_index_image_assignments_on_attachable_id_and_type"

      rename_table "image_folders", "gko_image_folders"
      
      remove_index "image_folders_images", :name => "index_image_folders_images_on_image_folder_id_and_image_id"
      remove_index "image_folders_images", :name => "index_image_folders_images_on_image_id_and_image_folder_id"
      rename_table "image_folders_images", "gko_image_folders_gko_images" 
      add_index "gko_image_folders_gko_images", ["image_folder_id", "image_id"], :name => "gko_index_image_folders_images_on_folder_id_and_image_id"
      add_index "gko_image_folders_gko_images", ["image_id", "image_folder_id"], :name => "gko_index_image_folders_images_on_image_id_and_folder_id"

      rename_table "images", "gko_images" 
      rename_table "inquiries", "gko_inquiries" 
      
      remove_index "languages", :name => "index_languages_on_site_id_and_position"
      remove_index "languages", :name => "index_languages_on_site_id"
      rename_table "languages", "gko_languages"
      add_index "gko_languages", ["site_id", "position"], :name => "gko_index_languages_on_site_id_and_position"
      add_index "gko_languages", ["site_id"], :name => "gko_index_languages_on_site_id"

      remove_index "mail_methods", :name => "index_mail_methods_on_site_id"
      rename_table "mail_methods", "gko_mail_methods"
      add_index "gko_mail_methods", ["site_id"], :name => "gko_index_mail_methods_on_site_id"

      remove_index "partner_translations", :name => "index_partner_translations_on_locale"
      remove_index "partner_translations", :name => "index_partner_translations_on_partner_id"
      rename_table "partner_translations", "gko_partner_translations"
      rename_column "gko_partner_translations", "partner_id", "gko_partner_id"
      add_index "gko_partner_translations", ["locale"], :name => "gko_index_partner_translations_on_locale"
      add_index "gko_partner_translations", ["gko_partner_id"], :name => "gko_index_partner_translations_on_partner_id"

      remove_index "partners", :name => "index_partners_on_position_and_section_id"
      remove_index "partners", :name => "index_partners_on_section_id"
      remove_index "partners", :name => "index_partners_on_site_id"
      rename_table "partners", "gko_partners"
      add_index "gko_partners", ["position", "section_id"], :name => "gko_index_partners_on_position_and_section_id"
      add_index "gko_partners", ["section_id"], :name => "gko_index_partners_on_section_id"
      add_index "gko_partners", ["site_id"], :name => "gko_index_partners_on_site_id"

      remove_index "preferences", :name => "index_preferences_on_key"
      rename_table "preferences", "gko_preferences"
      add_index "gko_preferences", ["key"], :name => "gko_index_preferences_on_key", :unique => true

      rename_table "roles", "gko_roles"
      
      remove_index "roles_users", :name => "index_roles_users_on_role_id"
      remove_index "roles_users", :name => "index_roles_users_on_user_id"
      rename_table "roles_users", "gko_roles_gko_users"
      add_index "gko_roles_gko_users", ["role_id"], :name => "gko_index_roles_users_on_role_id"
      add_index "gko_roles_gko_users", ["user_id"], :name => "gko_index_roles_users_on_user_id"

      remove_index "section_translations", :name => "index_section_translations_on_locale"
      remove_index "section_translations", :name => "index_section_translations_on_section_id"
      rename_table "section_translations", "gko_section_translations"
      rename_column "gko_section_translations", "section_id", "gko_section_id"
      add_index "gko_section_translations", ["locale"], :name => "gko_index_section_translations_on_locale"
      add_index "gko_section_translations", ["gko_section_id"], :name => "gko_index_section_translations_on_section_id"

      remove_index "sections", :name => "index_sections_on_link_id_and_link_type"
      remove_index "sections", :name => "index_sections_on_parent_id_and_lft"
      rename_table "sections", "gko_sections"
      add_index "gko_sections", ["link_id", "link_type"], :name => "gko_index_sections_on_link_id_and_link_type"
      add_index "gko_sections", ["parent_id", "lft"], :name => "gko_index_sections_on_parent_id_and_lft"

      remove_index "site_translations", :name => "index_site_translations_on_locale"
      remove_index "site_translations", :name => "index_site_translations_on_site_id"
      rename_table "site_translations", "gko_site_translations"
      rename_column "gko_site_translations", "site_id", "gko_site_id" 
      add_index "gko_site_translations", ["locale"], :name => "gko_index_site_translations_on_locale"
      add_index "gko_site_translations", ["gko_site_id"], :name => "gko_index_site_translations_on_site_id"

      remove_index "sites", :name => "index_sites_on_host"
      rename_table "sites", "gko_sites"
      add_index "gko_sites", ["host"], :name => "gko_index_sites_on_host", :unique => true

      remove_index "text_element_translations", :name => "index_text_element_translations_on_locale_and_text_element_id"
      rename_table "text_element_translations", "gko_text_element_translations"
      rename_column "gko_text_element_translations", "text_element_id", "gko_text_element_id"
      add_index "gko_text_element_translations", ["locale", "gko_text_element_id"], :name => "gko_index_text_element_translations_on_text_element"

      remove_index "text_elements", :name => "index_text_elements_on_name"
      remove_index "text_elements", :name => "index_text_elements_on_section_id"
      rename_table "text_elements", "gko_text_elements"
      add_index "gko_text_elements", ["name"], :name => "gko_index_text_elements_on_name"
      add_index "gko_text_elements", ["section_id"], :name => "gko_index_text_elements_on_section_id"

      remove_index "tokenized_permissions", :name => "index_tokenized_name_and_type"
      rename_table "tokenized_permissions", "gko_tokenized_permissions"
      add_index "gko_tokenized_permissions", ["permissable_id", "permissable_type"], :name => "gko_index_tokenized_name_and_type"

      remove_index "users", :name => "index_users_on_persistence_token"
      remove_index "users", :name => "index_users_on_site_id"
      rename_table "users", "gko_users"
      add_index "gko_users", ["persistence_token"], :name => "gko_index_users_on_persistence_token"
      add_index "gko_users", ["site_id"], :name => "gko_index_users_on_site_id"
      
    else
      create_table "gko_assets", :force => true do |t|
        t.integer  "site_id"
        t.string   "content_type"
        t.integer  "width"
        t.integer  "height"
        t.integer  "size"
        t.string   "source"
        t.string   "source_filename"
        t.datetime "created_at",      :null => false
        t.datetime "updated_at",      :null => false
      end

      add_index "gko_assets", ["site_id"], :name => "gko_index_assets_on_site_id"

      create_table "gko_content_translations", :force => true do |t|
        t.integer  "gko_content_id"
        t.string   "locale"
        t.string   "meta_title"
        t.text     "body"
        t.string   "title"
        t.string   "slug"
        t.text     "meta_description"
        t.datetime "created_at",       :null => false
        t.datetime "updated_at",       :null => false
      end

      add_index "gko_content_translations", ["gko_content_id"], :name => "gko_index_content_translations_on_content_id"
      add_index "gko_content_translations", ["locale"], :name => "gko_index_content_translations_on_locale"

      create_table "gko_contents", :force => true do |t|
        t.integer  "site_id"
        t.integer  "section_id"
        t.integer  "account_id"
        t.string   "type"
        t.string   "title"
        t.string   "slug"
        t.text     "body"
        t.datetime "published_at"
        t.string   "layout",           :limit => 40
        t.string   "meta_title"
        t.text     "meta_description"
        t.text     "options"
        t.string   "author_name",      :limit => 120
        t.datetime "created_at",                                     :null => false
        t.datetime "updated_at",                                     :null => false
        t.integer  "position",                        :default => 1
        t.integer  "access_count",                    :default => 0
      end

      add_index "gko_contents", ["access_count"], :name => "gko_index_contents_on_access_count"
      add_index "gko_contents", ["position", "section_id"], :name => "gko_index_contents_on_position_and_section_id"
      add_index "gko_contents", ["section_id"], :name => "gko_index_contents_on_section_id"
      add_index "gko_contents", ["site_id"], :name => "gko_index_contents_on_site_id"
      add_index "gko_contents", ["slug"], :name => "gko_index_contents_on_slug"

      create_table "gko_document_assignments", :force => true do |t|
        t.integer  "position",                      :default => 1, :null => false
        t.integer  "document_id",                                  :null => false
        t.integer  "attachable_id",                                :null => false
        t.string   "attachable_type", :limit => 40,                :null => false
        t.datetime "created_at",                                   :null => false
        t.datetime "updated_at",                                   :null => false
      end

      add_index "gko_document_assignments", ["attachable_id", "attachable_type"], :name => "gko_index_document_assignments_on_attachable_id_and_type"

      create_table "gko_document_items", :force => true do |t|
        t.string   "title"
        t.text     "body"
        t.date     "published_at"
        t.integer  "site_id"
        t.integer  "section_id"
        t.string   "document_mime_type"
        t.string   "document_name"
        t.integer  "document_size"
        t.string   "document_uid"
        t.string   "document_ext"
        t.string   "image_mime_type"
        t.string   "image_name"
        t.integer  "image_size"
        t.integer  "image_width"
        t.integer  "image_height"
        t.string   "image_uid"
        t.string   "image_ext"
        t.datetime "created_at",                      :null => false
        t.datetime "updated_at",                      :null => false
        t.integer  "country_id"
        t.string   "language",           :limit => 5
      end

      add_index "gko_document_items", ["country_id"], :name => "gko_index_press_articles_on_country_id"
      add_index "gko_document_items", ["section_id"], :name => "gko_index_press_articles_on_section_id"
      add_index "gko_document_items", ["site_id"], :name => "gko_index_press_articles_on_site_id"

      create_table "gko_document_translations", :force => true do |t|
        t.integer  "gko_document_id"
        t.string   "locale"
        t.string   "title"
        t.text     "alt"
        t.datetime "created_at",  :null => false
        t.datetime "updated_at",  :null => false
      end

      add_index "gko_document_translations", ["gko_document_id"], :name => "gko_index_document_translations_on_document_id"
      add_index "gko_document_translations", ["locale"], :name => "gko_index_document_translations_on_locale"

      create_table "gko_documents", :force => true do |t|
        t.string   "title",                      :limit => 100
        t.string   "lang",                       :limit => 4
        t.string   "alt"
        t.integer  "site_id"
        t.integer  "document_assignments_count",                :default => 0
        t.datetime "created_at",                                               :null => false
        t.datetime "updated_at",                                               :null => false
        t.string   "document_mime_type"
        t.string   "document_name"
        t.integer  "document_size"
        t.string   "document_uid"
        t.string   "document_ext"
      end

      create_table "gko_image_assignments", :force => true do |t|
        t.integer  "position",                      :default => 1, :null => false
        t.integer  "image_id",                                     :null => false
        t.integer  "attachable_id",                                :null => false
        t.string   "attachable_type", :limit => 40,                :null => false
        t.datetime "created_at",                                   :null => false
        t.datetime "updated_at",                                   :null => false
      end

      add_index "gko_image_assignments", ["attachable_id", "attachable_type"], :name => "gko_index_image_assignments_on_attachable_id_and_type"

      create_table "gko_image_folders", :force => true do |t|
        t.string   "name"
        t.integer  "site_id"
        t.integer  "parent_id"
        t.integer  "lft"
        t.integer  "rgt"
        t.integer  "level"
        t.datetime "created_at", :null => false
        t.datetime "updated_at", :null => false
      end

      create_table "gko_image_folders_images", :id => false, :force => true do |t|
        t.integer  "image_folder_id"
        t.integer  "image_id"
        t.datetime "created_at",      :null => false
        t.datetime "updated_at",      :null => false
      end

      add_index "gko_image_folders_images", ["image_folder_id", "image_id"], :name => "gko_index_image_folders_images_on_image_folder_id_and_image_id"
      add_index "gko_image_folders_images", ["image_id", "image_folder_id"], :name => "gko_index_image_folders_images_on_image_id_and_image_folder_id"

      create_table "gko_images", :force => true do |t|
        t.integer  "site_id"
        t.integer  "image_assignments_count", :default => 0
        t.datetime "created_at",                             :null => false
        t.datetime "updated_at",                             :null => false
        t.string   "image_mime_type"
        t.string   "image_name"
        t.integer  "image_size"
        t.integer  "image_width"
        t.integer  "image_height"
        t.string   "image_uid"
      end

      create_table "gko_inquiries", :force => true do |t|
        t.string   "type"
        t.string   "confirmation_code", :limit => 40
        t.string   "to_email"
        t.string   "name"
        t.string   "email"
        t.string   "phone"
        t.text     "message"
        t.boolean  "open",                            :default => true
        t.datetime "created_at"
        t.datetime "updated_at"
        t.datetime "confirmed_at"
        t.boolean  "spam",                            :default => false
        t.text     "options"
        t.integer  "site_id"
      end

      create_table "gko_languages", :force => true do |t|
        t.integer  "site_id"
        t.string   "name"
        t.string   "code"
        t.integer  "position",     :default => 1
        t.string   "presentation"
        t.boolean  "public",       :default => false
        t.boolean  "default",      :default => false
        t.datetime "created_at",                      :null => false
        t.datetime "updated_at",                      :null => false
      end

      add_index "gko_languages", ["site_id", "position"], :name => "gko_index_languages_on_site_id_and_position"
      add_index "gko_languages", ["site_id"], :name => "gko_index_languages_on_site_id"

      create_table "gko_mail_methods", :force => true do |t|
        t.integer  "site_id",                                                       :null => false
        t.string   "environment",            :default => "production"
        t.boolean  "enable_mail_delivery",   :default => true
        t.string   "mail_host",              :default => "localhost"
        t.string   "mail_domain",            :default => "localhost"
        t.integer  "mail_port",              :default => 25
        t.string   "mail_auth_type",         :default => "none"
        t.string   "smtp_username",                                                 :null => false
        t.string   "smtp_password",                                                 :null => false
        t.string   "secure_connection_type", :default => "None"
        t.string   "mails_from",             :default => "no-reply@joufdesign.com"
        t.string   "mail_bcc"
        t.datetime "created_at",                                                    :null => false
        t.datetime "updated_at",                                                    :null => false
      end

      add_index "gko_mail_methods", ["site_id"], :name => "gko_index_mail_methods_on_site_id"

      create_table "gko_partner_translations", :force => true do |t|
        t.integer  "gko_partner_id"
        t.string   "locale"
        t.text     "body"
        t.datetime "created_at", :null => false
        t.datetime "updated_at", :null => false
      end

      add_index "gko_partner_translations", ["locale"], :name => "gko_index_partner_translations_on_locale"
      add_index "gko_partner_translations", ["gko_partner_id"], :name => "gko_index_partner_translations_on_partner_id"

      create_table "gko_partners", :force => true do |t|
        t.string   "title"
        t.text     "body"
        t.string   "link"
        t.integer  "site_id"
        t.integer  "section_id"
        t.string   "image_mime_type"
        t.string   "image_name"
        t.integer  "image_size"
        t.integer  "image_width"
        t.integer  "image_height"
        t.string   "image_uid"
        t.string   "image_ext"
        t.datetime "created_at",                     :null => false
        t.datetime "updated_at",                     :null => false
        t.integer  "position",        :default => 1
      end

      add_index "gko_partners", ["position", "section_id"], :name => "gko_index_partners_on_position_and_section_id"
      add_index "gko_partners", ["section_id"], :name => "gko_index_partners_on_section_id"
      add_index "gko_partners", ["site_id"], :name => "gko_index_partners_on_site_id"

      create_table "gko_preferences", :force => true do |t|
        t.string   "key",                      :null => false
        t.string   "value_type", :limit => 50
        t.string   "value"
        t.datetime "created_at",               :null => false
        t.datetime "updated_at",               :null => false
      end

      add_index "gko_preferences", ["key"], :name => "gko_index_preferences_on_key", :unique => true

      create_table "gko_roles", :force => true do |t|
        t.string "name"
      end

      create_table "gko_roles_users", :id => false, :force => true do |t|
        t.integer "role_id"
        t.integer "user_id"
      end

      add_index "gko_roles_users", ["role_id"], :name => "gko_index_roles_users_on_role_id"
      add_index "gko_roles_users", ["user_id"], :name => "gko_index_roles_users_on_user_id"

      create_table "gko_section_translations", :force => true do |t|
        t.integer  "gko_section_id"
        t.string   "locale"
        t.string   "meta_title"
        t.string   "path"
        t.text     "body"
        t.string   "title"
        t.string   "menu_title"
        t.string   "redirect_url"
        t.string   "slug"
        t.text     "meta_description"
        t.datetime "created_at",       :null => false
        t.datetime "updated_at",       :null => false
        t.text     "alt"
      end

      add_index "gko_section_translations", ["locale"], :name => "gko_index_section_translations_on_locale"
      add_index "gko_section_translations", ["gko_section_id"], :name => "gko_index_section_translations_on_section_id"

      create_table "gko_sections", :force => true do |t|
        t.integer  "site_id"
        t.integer  "parent_id"
        t.integer  "link_id"
        t.string   "link_type"
        t.integer  "lft"
        t.integer  "rgt"
        t.string   "type"
        t.string   "name"
        t.string   "slug"
        t.string   "path"
        t.text     "options"
        t.string   "title"
        t.string   "layout"
        t.text     "body"
        t.string   "meta_title"
        t.text     "meta_description"
        t.string   "redirect_url"
        t.datetime "published_at"
        t.boolean  "hidden",            :default => false
        t.datetime "created_at",                           :null => false
        t.datetime "updated_at",                           :null => false
        t.string   "menu_title"
        t.boolean  "shallow_permalink", :default => true
        t.boolean  "robot_index",       :default => true
        t.boolean  "robot_follow",      :default => true
        t.boolean  "restricted",        :default => false
        t.string   "template"
        t.text     "alt"
      end

      add_index "gko_sections", ["link_id", "link_type"], :name => "gko_index_sections_on_link_id_and_link_type"
      add_index "gko_sections", ["parent_id", "lft"], :name => "gko_index_sections_on_parent_id_and_lft"

      
      create_table "gko_site_translations", :force => true do |t|
        t.integer  "gko_site_id"
        t.string   "locale"
        t.string   "meta_title"
        t.string   "title"
        t.string   "subtitle"
        t.datetime "created_at", :null => false
        t.datetime "updated_at", :null => false
      end

      add_index "gko_site_translations", ["locale"], :name => "gko_index_site_translations_on_locale"
      add_index "gko_site_translations", ["gko_site_id"], :name => "gko_index_site_translations_on_site_id"

      create_table "gko_sites", :force => true do |t|
        t.string   "host"
        t.string   "title"
        t.string   "meta_title"
        t.string   "subtitle"
        t.string   "timezone"
        t.boolean  "public",                   :default => true
        t.text     "options"
        t.datetime "created_at",                                  :null => false
        t.datetime "updated_at",                                  :null => false
        t.text     "plugins"
        t.string   "default_image_uid"
        t.integer  "languages_count",          :default => 0
        t.datetime "liquid_models_updated_at"
        t.text     "page_types"
        t.boolean  "front_page_cached",        :default => false
        t.text     "stylesheet"
        t.text     "javascript"
        t.text     "mailer_settings"
      end

      add_index "gko_sites", ["host"], :name => "gko_index_sites_on_host", :unique => true

      create_table "gko_text_element_translations", :force => true do |t|
        t.integer  "gko_text_element_id"
        t.string   "locale"
        t.text     "content"
        t.datetime "created_at",      :null => false
        t.datetime "updated_at",      :null => false
      end

      add_index "gko_text_element_translations", ["locale", "gko_text_element_id"], :name => "gko_index_text_element_translations_on_text_element"

      create_table "gko_text_elements", :force => true do |t|
        t.integer "section_id"
        t.string  "name"
        t.text    "content"
        t.integer "position",   :default => 1
      end

      add_index "gko_text_elements", ["name"], :name => "gko_index_text_elements_on_name"
      add_index "gko_text_elements", ["section_id"], :name => "gko_index_text_elements_on_section_id"

      create_table "gko_tokenized_permissions", :force => true do |t|
        t.integer  "permissable_id"
        t.string   "permissable_type"
        t.string   "token"
        t.datetime "created_at"
        t.datetime "updated_at"
      end

      add_index "gko_tokenized_permissions", ["permissable_id", "permissable_type"], :name => "gko_index_tokenized_name_and_type"

      create_table "gko_users", :force => true do |t|
        t.string   "email",                                   :default => "", :null => false
        t.string   "encrypted_password",       :limit => 128, :default => "", :null => false
        t.string   "confirmation_token"
        t.datetime "confirmed_at"
        t.datetime "confirmation_sent_at"
        t.string   "reset_password_token"
        t.datetime "remember_created_at"
        t.integer  "sign_in_count",                           :default => 0
        t.datetime "current_sign_in_at"
        t.datetime "last_sign_in_at"
        t.string   "current_sign_in_ip"
        t.string   "last_sign_in_ip"
        t.string   "username",                 :limit => 60
        t.string   "firstname",                :limit => 60
        t.string   "lastname",                 :limit => 60
        t.string   "preferred_language",       :limit => 5
        t.string   "timezone"
        t.integer  "site_registrations_count",                :default => 0
        t.datetime "created_at",                                              :null => false
        t.datetime "updated_at",                                              :null => false
        t.string   "password_salt"
        t.string   "persistence_token"
        t.string   "perishable_token"
        t.integer  "failed_attempts",                         :default => 0,  :null => false
        t.datetime "last_request_at"
        t.string   "login"
        t.string   "authentication_token"
        t.string   "unlock_token"
        t.datetime "locked_at"
        t.datetime "reset_password_sent_at"
        t.integer  "site_id"
      end

      add_index "gko_users", ["persistence_token"], :name => "gko_index_users_on_persistence_token"
      add_index "gko_users", ["site_id"], :name => "gko_index_users_on_site_id"
    end
    
    # Add missing indexes
    add_index :gko_users, :email, :unique => true
    add_index :gko_sections, :lft
    add_index :gko_sections, :parent_id
    add_index :gko_sections, :rgt
    add_index :gko_images, :site_id
    add_index :gko_inquiries, :site_id 
    
  end
end
